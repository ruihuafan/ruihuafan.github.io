(function() {
  var avatars = document.querySelectorAll('[data-pixel-avatar]');
  if (!avatars.length) return;

  var styles = [
    { hue: -3, saturation: 1.42, contrast: 1.18, brightness: 6, colorLevels: 5, detailLevels: 7, edge: 145, range: 54 },
    { hue: 5, saturation: 1.35, contrast: 1.24, brightness: 3, colorLevels: 5, detailLevels: 8, edge: 155, range: 50 },
    { hue: 12, saturation: 1.38, contrast: 1.16, brightness: 9, colorLevels: 6, detailLevels: 8, edge: 138, range: 58 },
    { hue: -10, saturation: 1.3, contrast: 1.26, brightness: 5, colorLevels: 5, detailLevels: 7, edge: 150, range: 52 }
  ];

  var featureRegions = [
    { x: 0.28, y: 0.05, width: 0.3, height: 0.35, edgeScale: 0.78, lift: 0.06 },
    { x: 0.64, y: 0.42, width: 0.35, height: 0.34, edgeScale: 0.72, lift: 0.02 }
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        default:
          h = (r - g) / d + 4;
      }
      h /= 6;
    }

    return [h * 360, s, l];
  }

  function hslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;

    function hueToRgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      var gray = Math.round(l * 255);
      return [gray, gray, gray];
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    return [
      Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
      Math.round(hueToRgb(p, q, h) * 255),
      Math.round(hueToRgb(p, q, h - 1 / 3) * 255)
    ];
  }

  function inFeatureRegion(x, y, width, height) {
    for (var i = 0; i < featureRegions.length; i += 1) {
      var region = featureRegions[i];
      var left = region.x * width;
      var top = region.y * height;
      var right = left + region.width * width;
      var bottom = top + region.height * height;

      if (x >= left && x <= right && y >= top && y <= bottom) {
        return region;
      }
    }

    return null;
  }

  function luminance(data, width, x, y) {
    var i = (y * width + x) * 4;
    return data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  }

  function makeSpatialKernel(radius, sigma) {
    var kernel = [];
    var denom = 2 * sigma * sigma;

    for (var y = -radius; y <= radius; y += 1) {
      for (var x = -radius; x <= radius; x += 1) {
        kernel.push({
          x: x,
          y: y,
          weight: Math.exp(-(x * x + y * y) / denom)
        });
      }
    }

    return kernel;
  }

  function bilateralSmooth(source, width, height, radius, sigmaSpatial, sigmaRange) {
    var output = new Uint8ClampedArray(source.length);
    var kernel = makeSpatialKernel(radius, sigmaSpatial);
    var rangeDenom = 2 * sigmaRange * sigmaRange;

    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var i = (y * width + x) * 4;
        var centerR = source[i];
        var centerG = source[i + 1];
        var centerB = source[i + 2];
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        var weightSum = 0;

        for (var k = 0; k < kernel.length; k += 1) {
          var sampleX = clamp(x + kernel[k].x, 0, width - 1);
          var sampleY = clamp(y + kernel[k].y, 0, height - 1);
          var si = (sampleY * width + sampleX) * 4;
          var dr = source[si] - centerR;
          var dg = source[si + 1] - centerG;
          var db = source[si + 2] - centerB;
          var colorWeight = Math.exp(-(dr * dr + dg * dg + db * db) / rangeDenom);
          var weight = kernel[k].weight * colorWeight;

          sumR += source[si] * weight;
          sumG += source[si + 1] * weight;
          sumB += source[si + 2] * weight;
          weightSum += weight;
        }

        output[i] = sumR / weightSum;
        output[i + 1] = sumG / weightSum;
        output[i + 2] = sumB / weightSum;
        output[i + 3] = 255;
      }
    }

    return output;
  }

  function posterizeColor(r, g, b, style, region) {
    var hsl = rgbToHsl(r, g, b);
    var levels = region ? style.detailLevels : style.colorLevels;
    var h = hsl[0] + style.hue;
    var s = clamp(hsl[1] * style.saturation + 0.04, 0, 0.9);
    var lift = region ? region.lift || 0 : 0;
    var l = clamp((hsl[2] - 0.5) * style.contrast + 0.5 + style.brightness / 255 + lift, 0, 1);

    s = Math.round(s * 5) / 5;
    l = Math.round(l * (levels - 1)) / (levels - 1);

    return hslToRgb(h, s, l);
  }

  function buildCartoonImage(source, smooth, width, height, style, context) {
    var image = context.createImageData(width, height);
    var output = image.data;

    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var i = (y * width + x) * 4;
        var region = inFeatureRegion(x, y, width, height);
        var color = posterizeColor(smooth[i], smooth[i + 1], smooth[i + 2], style, region);

        output[i] = color[0];
        output[i + 1] = color[1];
        output[i + 2] = color[2];
        output[i + 3] = 255;
      }
    }

    addInkOutlines(output, source, smooth, width, height, style);
    pixelizeCartoon(output, width, height);
    return image;
  }

  function pixelizeCartoon(output, width, height) {
    var original = new Uint8ClampedArray(output);

    pixelizeRegion(original, output, width, 0, 0, width, height, 3);

    for (var i = 0; i < featureRegions.length; i += 1) {
      var region = featureRegions[i];
      pixelizeRegion(
        original,
        output,
        width,
        Math.floor(region.x * width),
        Math.floor(region.y * height),
        Math.ceil((region.x + region.width) * width),
        Math.ceil((region.y + region.height) * height),
        2
      );
    }
  }

  function pixelizeRegion(source, output, width, left, top, right, bottom, blockSize) {
    for (var y = top; y < bottom; y += blockSize) {
      for (var x = left; x < right; x += blockSize) {
        var blockRight = Math.min(x + blockSize, right);
        var blockBottom = Math.min(y + blockSize, bottom);
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        var count = 0;

        for (var by = y; by < blockBottom; by += 1) {
          for (var bx = x; bx < blockRight; bx += 1) {
            var sample = (by * width + bx) * 4;
            sumR += source[sample];
            sumG += source[sample + 1];
            sumB += source[sample + 2];
            count += 1;
          }
        }

        var r = Math.round(sumR / count);
        var g = Math.round(sumG / count);
        var b = Math.round(sumB / count);

        for (var py = y; py < blockBottom; py += 1) {
          for (var px = x; px < blockRight; px += 1) {
            var target = (py * width + px) * 4;
            output[target] = r;
            output[target + 1] = g;
            output[target + 2] = b;
            output[target + 3] = 255;
          }
        }
      }
    }
  }

  function addInkOutlines(output, source, smooth, width, height, style) {
    var mask = new Uint8Array(width * height);

    for (var y = 1; y < height - 1; y += 1) {
      for (var x = 1; x < width - 1; x += 1) {
        var region = inFeatureRegion(x, y, width, height);
        var edgeScale = region ? region.edgeScale : 1;
        var threshold = style.edge * edgeScale;
        var gx =
          -luminance(smooth, width, x - 1, y - 1) -
          2 * luminance(smooth, width, x - 1, y) -
          luminance(smooth, width, x - 1, y + 1) +
          luminance(smooth, width, x + 1, y - 1) +
          2 * luminance(smooth, width, x + 1, y) +
          luminance(smooth, width, x + 1, y + 1);
        var gy =
          -luminance(smooth, width, x - 1, y - 1) -
          2 * luminance(smooth, width, x, y - 1) -
          luminance(smooth, width, x + 1, y - 1) +
          luminance(smooth, width, x - 1, y + 1) +
          2 * luminance(smooth, width, x, y + 1) +
          luminance(smooth, width, x + 1, y + 1);
        var detailEdge = Math.abs(luminance(source, width, x, y) - luminance(source, width, x + 1, y));
        var edge = Math.abs(gx) + Math.abs(gy) + detailEdge * 0.9;

        if (edge > threshold) {
          mask[y * width + x] = region ? 2 : 1;
        }
      }
    }

    for (var my = 1; my < height - 1; my += 1) {
      for (var mx = 1; mx < width - 1; mx += 1) {
        var strength = mask[my * width + mx];
        if (!strength) continue;

        var radius = 0;
        for (var dy = -radius; dy <= radius; dy += 1) {
          for (var dx = -radius; dx <= radius; dx += 1) {
            blendInk(output, width, mx + dx, my + dy, strength === 2 ? 0.52 : 0.62);
          }
        }
      }
    }
  }

  function blendInk(output, width, x, y, alpha) {
    var i = (y * width + x) * 4;
    var inkR = 12;
    var inkG = 20;
    var inkB = 34;

    output[i] = output[i] * (1 - alpha) + inkR * alpha;
    output[i + 1] = output[i + 1] * (1 - alpha) + inkG * alpha;
    output[i + 2] = output[i + 2] * (1 - alpha) + inkB * alpha;
  }

  function drawSourceCrop(image, scratchContext, width, height) {
    var sourceHeight = image.naturalHeight * 2 / 3;

    scratchContext.clearRect(0, 0, width, height);
    scratchContext.imageSmoothingEnabled = true;
    scratchContext.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );
  }

  function renderAvatar(root) {
    var img = root.querySelector('.avatar-source');
    var canvas = root.querySelector('.avatar-canvas');
    if (!img || !canvas || !canvas.getContext) return;

    var width = canvas.width || 280;
    var height = canvas.height || 240;
    var style = styles[Math.floor(Math.random() * styles.length)];
    var scratch = document.createElement('canvas');
    var scratchContext = scratch.getContext('2d', { willReadFrequently: true });
    var context = canvas.getContext('2d');

    scratch.width = width;
    scratch.height = height;
    drawSourceCrop(img, scratchContext, width, height);

    var sourceImage = scratchContext.getImageData(0, 0, width, height);
    var source = sourceImage.data;
    var smooth = bilateralSmooth(source, width, height, 3, 3.2, style.range);
    var cartoon = buildCartoonImage(source, smooth, width, height, style, context);

    context.putImageData(cartoon, 0, 0);
    root.classList.add('is-ready');
  }

  avatars.forEach(function(root) {
    var img = root.querySelector('.avatar-source');
    if (!img) return;

    if (img.complete && img.naturalWidth) {
      renderAvatar(root);
      return;
    }

    img.addEventListener('load', function() {
      renderAvatar(root);
    }, { once: true });
  });
})();
