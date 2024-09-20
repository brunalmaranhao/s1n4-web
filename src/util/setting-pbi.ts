import { models } from "powerbi-client";

export const VISUAL_SETTINGS: models.ISettings = {
  localeSettings: {
    language: "pt-br",
    formatLocale: "pt-br",
  },
  layoutType: models.LayoutType.Custom,
  customLayout: {
    pageSize: {
      type: models.PageSizeType.Widescreen,
    },
    displayOption: models.DisplayOption.FitToWidth,
  },

  filterPaneEnabled: false,
  persistentFiltersEnabled: false,
  personalBookmarksEnabled: false,
  navContentPaneEnabled: false,
  bars: {
    actionBar: {
      visible: true,
    },
  },
  panes: {
    bookmarks: {
      visible: false,
    },
    filters: {
      expanded: true,
      visible: false,
    },
    pageNavigation: {
      visible: true,
    },
    syncSlicers: {
      visible: true,
    },
  },
};

export const VISUAL_SETTINGS_DEFAULT: models.ISettings = {
  panes: {
    filters: {
      expanded: false,
      visible: false,
    },
  },
  background: models.BackgroundType.Transparent,
  customLayout: {
    pageSize: {
      type: models.PageSizeType.Widescreen,
    },
    displayOption: models.DisplayOption.FitToWidth,
  },
};
