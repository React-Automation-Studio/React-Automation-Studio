import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

const SectionCard = ({
  icon: Icon,
  title,
  subtitle,
  elevation,
  scrollable = false,
  scrollMaxHeight = "42vh",
  hover = true,
  sx,
  children,
}) => {
  const theme = useTheme();
  const hoverShadow = theme.shadows[Math.min((elevation ?? 1) + 2, 24)];
  const hasHeader = Boolean(Icon || title || subtitle);

  return (
    <Paper
      elevation={elevation}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2.5, sm: 3 },
        gap: 2.5,
        borderRadius: 2,
        transition: theme.transitions.create("box-shadow", {
          duration: theme.transitions.duration.shortest,
        }),
        ...(hover && { "&:hover": { boxShadow: hoverShadow } }),
        ...sx,
      }}
    >
      {hasHeader && (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="flex-start"
        >
          {Icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.12),
              }}
            >
              <Icon />
            </Box>
          )}
          {(title || subtitle) && (
            <Box sx={{ minWidth: 0 }}>
              {title && (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.2 }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="div"
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      )}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          ...(scrollable && {
            maxHeight: scrollMaxHeight,
            overflowY: "auto",
            pr: 1,
            mr: -1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha(theme.palette.text.primary, 0.2),
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              bgcolor: alpha(theme.palette.text.primary, 0.35),
            },
          }),
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export const SubSection = ({ title, children }) => (
  <Box>
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.5 }}>
      <Typography
        variant="overline"
        color="primary"
        sx={{ fontWeight: 700, letterSpacing: 1, lineHeight: 1 }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
    </Stack>
    {children}
  </Box>
);

export default SectionCard;
