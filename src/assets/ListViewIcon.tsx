const ListViewIcon = ({
  color = "currentColor",
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
      id="mask0_677_622"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <rect width="24" height="24" fill="currentColor" />
    </mask>
    <g mask="url(#mask0_677_622)">
      <path
        d="M5 19C3.89543 19 3 18.1046 3 17V14.75C3 13.6454 3.89543 12.75 5 12.75H19C20.1046 12.75 21 13.6454 21 14.75V17C21 18.1046 20.1046 19 19 19H5ZM5 11.25C3.89543 11.25 3 10.3546 3 9.25V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V9.25C21 10.3546 20.1046 11.25 19 11.25H5Z"
        fill={color}
      />
    </g>
  </svg>
);
export default ListViewIcon;
