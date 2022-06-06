varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisp;
uniform vec2 uResolution;
uniform float uAnimation;

void main() {
  vec2 newUV = (vUv - vec2(.5)) * uResolution.xy + vec2(.5);

  vec4 img1 = texture2D(uTexture1, newUV);
  vec4 img2 = texture2D(uTexture2, newUV);
  vec4 displace = texture2D(uDisp, newUV);

  float disp = smoothstep(.0, displace.r, uAnimation);

  vec4 color = mix(img1, img2, disp);

  gl_FragColor = color;
}