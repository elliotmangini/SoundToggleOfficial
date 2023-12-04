puts 'Begin seeding versions'
Version.create(
  name: "Micro",
  release: "1.04.0",
  notes: "
  Nearing MVP and deployment:
  -Functional audio player with personalization options.
-User-selectable style options.
-Playlist player and single-song formats.
-User upload functionality for before and after audio files.
-Customizable text and user management features.
-Exportable iframe for embedding on other websites.
-Admin dashboard and landing page.
-Reporting system for bugs, feature requests, and basic support.
  "
)

puts 'Begin seeding tags...'
tag_names = ["Educator", "Remixer", "Engineer", "Artist", "Spotify", "Soundcloud", "Website", "X", "Facebook"]

# Create the tags and assign them to local variables
tags = {}
tag_names.each do |tag_name|
    tags[tag_name.downcase] = Tag.create(name: tag_name)
end

puts "Seeded #{tag_names.length} tags."
puts 'Successfully seeded tags! ✅✅✅✅✅'

puts 'Begin seeding default themes...'
classic_theme = Theme.create(
    name: "Classic",
    background_color: "#004f6b", # panel (blue)
    primary_color: "#FFFFFF", # buttons (white)
    secondary_color: "#394153", # button-fills (dark-blue)
    tertiary_color: "#1c627a", # selected (highlight-blue)
    toggle_text_color: "#394153",
    toggle_highlight_color: "#EEC643",
    panel_style: "rounded",
    glow: true,
    display_user: true,
    display_blurb: true,
    text_primary_color: '#f4f4f4',
    text_secondary_color: '#bcd0d7',
    access: "free",

)
modern_theme = Theme.create(
    name: "Modern",
    background_color: "#151415",
    primary_color: "#2a2a2a", # dark grey
    secondary_color: "#bcd0d7", # white
    toggle_text_color: "#bcd0d7", # white
    tertiary_color: "#2a2b2b", # grey
    panel_style: "floating",
    glow: true,
    display_user: true,
    display_blurb: true,
    access: "free",

)
togglify_theme = Theme.create(
    name: "Togglify",
    background_color: "#414141", # (panel) nearly black
    primary_color: "#1ed660", # (button-backgrounds) lime green
    secondary_color: "#2a2a2a", # (button-fills/timeline) dark gray
    tertiary_color: "#5d5c5c", # (song-highlight) light gray
    text_primary_color: "#FFFFFF", # (text) bright white
    text_secondary_color: "#bcd0d7", # (text) off white
    toggle_text_color: "#2a2a2a",
    toggle_highlight_color: "#1ed660",
    panel_style: "rounded",
    glow: true,
    display_user: true,
    display_blurb: true,
    access: "free",
)
puts 'Successfully seeded default themes! ✅✅✅✅✅'