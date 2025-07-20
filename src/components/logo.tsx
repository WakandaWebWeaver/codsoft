export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M12 10H14.5C16.9853 10 19 12.0147 19 14.5C19 16.9853 16.9853 19 14.5 19H12V22H10V10H12ZM12 17H14.5C15.8807 17 17 15.8807 17 14.5C17 13.1193 15.8807 12 14.5 12H12V17Z"
        fill="white"
      />
      <path
        d="M18 10H20.5C22.9853 10 25 12.0147 25 14.5C25 16.9853 22.9853 19 20.5 19H18V22H16V10H18ZM18 17H20.5C21.8807 17 23 15.8807 23 14.5C23 13.1193 21.8807 12 20.5 12H18V17Z"
        fill="hsla(0, 100%, 100%, 0.5)"
      />
    </svg>
  );
}
