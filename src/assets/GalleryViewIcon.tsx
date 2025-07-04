const GalleryViewIcon = ({
  color,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_643_2069"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill={color} />
    </mask>
    <g mask="url(#mask0_643_2069)">
      <path
        d="M5 11.25C3.89543 11.25 3 10.3546 3 9.25V5C3 3.89543 3.89543 3 5 3H9.25C10.3546 3 11.25 3.89543 11.25 5V9.25C11.25 10.3546 10.3546 11.25 9.25 11.25H5ZM5 21C3.89543 21 3 20.1046 3 19V14.75C3 13.6454 3.89543 12.75 5 12.75H9.25C10.3546 12.75 11.25 13.6454 11.25 14.75V19C11.25 20.1046 10.3546 21 9.25 21H5ZM14.75 11.25C13.6454 11.25 12.75 10.3546 12.75 9.25V5C12.75 3.89543 13.6454 3 14.75 3H19C20.1046 3 21 3.89543 21 5V9.25C21 10.3546 20.1046 11.25 19 11.25H14.75ZM14.75 21C13.6454 21 12.75 20.1046 12.75 19V14.75C12.75 13.6454 13.6454 12.75 14.75 12.75H19C20.1046 12.75 21 13.6454 21 14.75V19C21 20.1046 20.1046 21 19 21H14.75Z"
        fill={color}
      />
    </g>
  </svg>
);
export default GalleryViewIcon;
