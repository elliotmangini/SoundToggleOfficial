import React, { useState, useEffect } from "react";
import _isEqual from 'lodash/isEqual';
import _difference from "lodash/difference";
import style from "../StyleSheets/ThemeEditor.module.css";

export default function ThemeEditor({ user, playlist, setPlaylistToDisplay, previewedTheme, setPreviewedTheme, setIsEditSpinner }) {
  const [freeThemes, setFreeThemes] = useState(null);
  const [initialTheme , setInitialTheme] = useState(playlist.theme);
  const [isSaved , setIsSaved] = useState(true);

  const themesAreEqualIgnoringId = (themeA, themeB) => {
    const { id: idA, ...restA } = themeA;
    const { id: idB, ...restB } = themeB;
    let differences = {};
  
    for (const prop in restA) {
      if (restA[prop] !== restB[prop]) {
        differences[prop] = {
          themeA: restA[prop],
          themeB: restB[prop],
        };
      }
    }
  
    if (Object.keys(differences).length === 0) {
      console.log("Themes are the same.");
      setIsSaved(true);
      // MAKE SURE THE PREVIEWED THEME HAS THE NAME OF THE FREE THEME
    } else {
      console.log("Themes are different.");
      console.log("Differences:", differences);
      setIsSaved(false);
    }
  };
  

  useEffect(() => {
    themesAreEqualIgnoringId(initialTheme, previewedTheme)
  }, [previewedTheme, initialTheme]);

  useEffect(() => {
    fetch("/free_themes")
      .then((response) => response.json())
      .then((data) => {
        setFreeThemes(data);
      })
      .catch((error) => {
        console.error("Error fetching latest version:", error);
      });
  }, []);

  useEffect(() => {
    setPlaylistToDisplay((playlist) => {
      return { ...playlist, theme: previewedTheme };
    });
  }, [previewedTheme]);

  const handleThemeChange = (newTheme) => {
    const selectedTheme = freeThemes.find((theme) => theme.name === newTheme);
    if (selectedTheme) {
      setPreviewedTheme({
        primary_color: selectedTheme.primary_color,
        secondary_color: selectedTheme.secondary_color,
        tertiary_color: selectedTheme.tertiary_color,
        panel_style: selectedTheme.panel_style,
        glow: selectedTheme.glow,
        background_color: selectedTheme.background_color,
        untoggled_name: selectedTheme.untoggled_name,
        toggled_name: selectedTheme.toggled_name,
        text_primary_color: selectedTheme.text_primary_color,
        text_secondary_color: selectedTheme.text_secondary_color,
        display_user: selectedTheme.display_user,
        display_blurb: selectedTheme.display_blurb,
        name: selectedTheme.name,
        toggle_text_color: selectedTheme.toggle_text_color,
        toggle_highlight_color: selectedTheme.toggle_highlight_color,
        primary_attribute_name: selectedTheme.primary_attribute_name,
        secondary_attribute_name: selectedTheme.secondary_attribute_name,
      });

      setPlaylistToDisplay((playlist) => {
        return { ...playlist, theme: selectedTheme };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlaylistToDisplay((playlist) => {
      return { ...playlist, theme: previewedTheme };
    });

    setIsEditSpinner(true);
    fetch("/themes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...previewedTheme, playlist_id: playlist.id }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Theme configuration updated successfully.");
          setIsSaved(true);
        } else {
          console.error("Failed to update theme configuration.");
        }
        setIsEditSpinner(false);
      })
      .catch((error) => {
        console.error("An error occurred while making the request:", error);
      });
  };

  return (
    <div
      className={style.theme_editor_panel}
      style={{ background: `linear-gradient(to bottom, ${previewedTheme.background_color}, ${previewedTheme.tertiary_color})` }}
    >
      <button 
        className={`${style.update_configuration_button}`}
        style={{ 
          backgroundColor: `${isSaved ? playlist?.theme.tertiary_color : playlist?.theme.primary_color}`, 
          color: `${isSaved ? playlist?.theme.text_secondary_color : playlist?.theme.secondary_color}`,
          pointerEvents: `${isSaved ? 'none' : 'auto'}`,
          userSelect: 'none',
        }}
        onClick={handleSubmit}
      >
        {isSaved ? "Previewing Themes..." : "Save Changes"}
      </button>
      <div className={style.button_container}>
        <button
          className={`${previewedTheme.name === "Classic" ? style.toggled_on : null} ${style.preset_theme_button}`}
          onClick={() => handleThemeChange("Classic")}
        >
          Classic
        </button>
        <button
          className={`${previewedTheme.name === "Modern" ? style.toggled_on : null} ${style.preset_theme_button}`}
          onClick={() => handleThemeChange("Modern")}
        >
          Modern
        </button>
        <button
          className={`${previewedTheme.name === "Togglify" ? style.toggled_on : null} ${style.preset_theme_button}`}
          onClick={() => handleThemeChange("Togglify")}
        >
          Togglify
        </button>
      </div>
      <div className={style.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={style.color_settings}>
            <div className={style.left_column}>
              <div className={style.left_color_setting}>
                <label>
                  Panel
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.background_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        background_color: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className={style.left_color_setting}>
                <label>
                  Buttons
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.primary_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        primary_color: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className={style.left_color_setting}>
                <label>
                  Button Fills
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.secondary_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        secondary_color: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className={style.left_color_setting}>
                <label>
                  Selected Song
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.tertiary_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        tertiary_color: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>
            <div className={style.right_column}>
              <div className={style.right_color_setting}>
                <label>
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.text_primary_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        text_primary_color: e.target.value,
                      })
                    }
                    />
                    Text Primary
                </label>
              </div>
              <div className={style.right_color_setting}>
                <label>
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.text_secondary_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        text_secondary_color: e.target.value,
                      })
                    }
                  />
                  Text Secondary
                </label>
              </div>
              <div className={style.right_color_setting}>
                <label>
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.toggle_text_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        toggle_text_color: e.target.value,
                      })
                    }
                    />
                    Toggle Text
                </label>
              </div>
              <div className={style.right_color_setting}>
                <label>
                  <input
                    type="color"
                    className={style.input_field}
                    value={previewedTheme.toggle_highlight_color}
                    onChange={(e) =>
                      setPreviewedTheme({
                        ...previewedTheme,
                        toggle_highlight_color: e.target.value,
                      })
                    }
                  />
                  Toggle Highlight
                </label>
              </div>
            </div>
          </div>
          <div className={style.nomenclature_settings}>
              <label className={style.left_name_setting}>
                Untoggled Name
                <input
                  type="text"
                  className={`${style.input_field} ${style.untoggled_name_input}`}
                  value={previewedTheme.untoggled_name}
                  onChange={(e) =>
                    setPreviewedTheme({
                      ...previewedTheme,
                      untoggled_name: e.target.value,
                    })
                  }
                />
              </label>
              <label className={style.right_name_setting}>
                <input
                  type="text"
                  className={`${style.input_field} ${style.toggled_name_input}`}
                  value={previewedTheme.toggled_name}
                  onChange={(e) =>
                    setPreviewedTheme({
                      ...previewedTheme,
                      toggled_name: e.target.value,
                    })
                  }
                />
                Toggled Name
              </label>
            </div>
          <div className={style.form_container_lower}>
            <label>
              Author Link:
              <input
                type="checkbox"
                checked={previewedTheme.display_user}
                onChange={() =>
                  setPreviewedTheme({
                    ...previewedTheme,
                    display_user: !previewedTheme.display_user,
                  })
                }
              />
            </label>
            <label>
              Blurb:
              <input
                type="checkbox"
                checked={previewedTheme.display_blurb}
                onChange={() =>
                  setPreviewedTheme({
                    ...previewedTheme,
                    display_blurb: !previewedTheme.display_blurb,
                  })
                }
              />
            </label>
            <label>
              Rounded:
              <input
                type="checkbox"
                checked={previewedTheme.panel_style === "rounded"}
                onChange={() =>
                  setPreviewedTheme({
                    ...previewedTheme,
                    panel_style: ((e) => e.target.checked ? "rounded" : "floating"),
                  })
                }
              />
            </label>
            <label>
              Glow Effect:
              <input
                type="checkbox"
                checked={previewedTheme.glow}
                onChange={() =>
                  setPreviewedTheme({
                    ...previewedTheme,
                    glow: !previewedTheme.glow,
                  })
                }
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
