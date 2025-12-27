import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "react-bootstrap";

const BreadcrumbNav = ({ items, sideNavButtons }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-5 justify-between items-center space-x-2 text-sm p-3 bg-white border-2 border-gray-300">
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {items.map((item, index) =>
            item.href ? (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                fontSize={16}
                href={item.href}
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ) : (
              <Typography key={index} fontSize={16} color="#C72571">
                {item.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      </Stack>

      {sideNavButtons && (
        <div>
          {sideNavButtons.map((btn, i) => (
            <Button
              key={i}
              onClick={btn.onClick}
              className="mx-1 px-4 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor: "#C72571",
                borderRadius: "20px",
                border: "none",
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreadcrumbNav;
