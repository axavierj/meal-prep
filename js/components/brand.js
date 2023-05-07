const brandTemplate = document.createElement('template')
brandTemplate.innerHTML = `

<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 708.49 1020.38" width="30px" height="30px">
  <defs>
    <style>
      .cls-1 {
        fill: #fc9aa7;
      }

      .cls-2 {
        fill: #a69281;
      }

      .cls-3 {
        fill: none;
      }
    </style>
  </defs>
  <g>
    <path class="cls-3" d="m104.48,811.66c-1.1-1.18-1.92-1.08-2.46.29" vector-effect="non-scaling-stroke"/>
    <path class="cls-3" d="m596.98,818.41l1.5.83" vector-effect="non-scaling-stroke"/>
  </g>
  <path class="cls-1" d="m487.48,57.59c9.21,104.37-127.58,95.84-190.27,139.08-15.9,16.92-23.11,40.77-11.01,58.53,7.28,10.67-20.62-12.8-20.13-19.64,8.41-117.97,211.16-64.65,197.41-168.97-2.86-21.71-39.3-86.59,1.37-60.51,136.74,110.89,80.56,296.51-85.37,329.51-82.8,16.46-113.81-42.35-182.55-40.76-55.29,1.28-72.36,71.33-53.24,111.95,26.35,54.26,19.31,80.34-13.09,13.89-39.88-73.9,14.78-180.61,105.87-151.61,38.79,7.7,70.68,40.55,110.9,39.22,126.08-.84,215.73-148.2,140.1-250.69h.01Z"/>
  <path class="cls-1" d="m602.17,300.51c-62.3-19.79-117.05,48.36-148.42,93.71-12.16,19.84-63.4,135.34-34.51,51.07,30.76-109.1,207.25-298.71,237.75-75.59,3.96,28.97-12.67,66.44-31.11,92.64,47.64,25.41,71.8,68.85,80.61,123.25,23,142-158,246-275.77,208.37-28.63-9.15-63.34-23.78-75.99-47.76,107.51,75.05,268.77,38.38,309.27-99.01,50.1-169.95-142.5-108.6-76.32-218.06,21.58-35.69,55.82-97.54,14.51-128.62h-.02Z"/>
  <path class="cls-1" d="m547.9,551.06c10.65-9.4,21.57-50.28,22.26-38.57,1.64,27.88-5.68,47.09-16.17,65.21-21.62,37.31-68.47,46.35-107.25,40.5-90.89-19.8-167.43-79.14-258.97-93.67-34.68-6.26-82.04-14.52-110.95,12.57-29.88,29.22-42.84,83.24-22.5,120.44,39.87,64.09,124.33,99.86,185.79,74.34,22.38-9.29,22.38,12.71-6.62,21.71-66.86,20.75-128.18,11.58-172.69-21.2-123.31-90.8-46.31-277.8,116.69-258.69,118.13,13.85,277.42,159.53,370.42,77.35h-.01Z"/>
  <path d="m101.69,805.7c-1.16-.95-1.74-.7-1.75.75-.73-1.89-1.39-3.82-1.97-5.79-.73-2.49-.48-2.6.77-.33,0,0,2.95,5.37,2.95,5.37Z"/>
  <path d="m101.69,805.7l2.79,5.96c-1.1-1.18-1.92-1.08-2.46.29l-2.08-5.5c0-1.45.59-1.7,1.75-.75Z"/>
  <path class="cls-2" d="m104.48,811.66c71.64,166.51,83.65,161.24,264.5,177.21,169.04-10.83,159.12-27.4,227.99-170.47-17.25,58.88-43.91,114.04-58.55,155.24-141.61,67.54-223.75,57.21-368.75-1.14-30.24-42.06-51.13-116.64-65.19-160.84h0Z"/>
  <path d="m598.48,819.24l-1.5-.83,3.62-6.47c.1-.17.26-.27.41-.25.19.02.22.14.07.37-.07.11-.12.22-.15.31-.72,2.33-1.54,4.62-2.45,6.87h0Z"/>
</svg>
`

class Brand extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(brandTemplate.content.cloneNode(true))
  }
}

customElements.define('app-brand', Brand)