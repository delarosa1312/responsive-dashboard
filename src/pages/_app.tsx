"use client";

// ** Next Imports
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// // ** Loader Import
// import NProgress from 'nprogress'

// // ** Emotion Imports
// import { CacheProvider } from '@emotion/react'
// import type { EmotionCache } from '@emotion/cache'

// // ** Config Imports
// import 'src/configs/i18n'
// import { defaultACLObj } from 'src/configs/acl'
// import themeConfig from 'src/configs/themeConfig'
// import { useThemeColors } from 'src/hooks/useThemeColors'

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// // ** Component Imports
// import UserLayout from 'src/layouts/UserLayout'
// import AclGuard from 'src/@core/components/auth/AclGuard'
// import ThemeComponent from 'src/@core/theme/ThemeComponent'
// import AuthGuard from 'src/@core/components/auth/AuthGuard'
// import GuestGuard from 'src/@core/components/auth/GuestGuard'

// // ** Spinner Import
// import Spinner from 'src/@core/components/spinner'

// // ** Contexts
import { AuthProvider } from "src/context/AuthContext";
// import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// // ** Styled Components
// import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// // ** Utils Imports
// import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// // ** React Perfect Scrollbar Style
// import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import { Box } from "@mui/material";
// import { ConfirmProvider } from 'material-ui-confirm'

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props;

  return (
    <Box
      sx={{
        background: "black",
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster position={"top-center"} toastOptions={{ className: "react-hot-toast" }} />
      </AuthProvider>
    </Box>
  );
};

export default App;
