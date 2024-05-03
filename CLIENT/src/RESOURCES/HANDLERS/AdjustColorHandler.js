export default function handleAdjustColor(hexColor, threshold, amount) {
  // Convert hex to RGB
  var hex = hexColor.replace(/^#/, "");
  var rgb = parseInt(hex, 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;

  // Calculate perceived brightness
  var brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If color is too light, darken it
  if (brightness > threshold) {
    // Convert RGB to HSL
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    // Decrease lightness by the specified amount
    l -= amount;

    // Ensure lightness stays within bounds [0, 1]
    l = Math.max(0, Math.min(1, l));

    // Convert HSL back to RGB
    var hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);

    // Convert RGB to hex
    var rgbToHex = function (r, g, b) {
      return (
        "#" +
        [r, g, b]
          .map(function (x) {
            return Math.round(x * 255)
              .toString(16)
              .padStart(2, "0");
          })
          .join("")
      );
    };

    return rgbToHex(r, g, b);
  } else {
    return hexColor;
  }
}
