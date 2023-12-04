assets_path = '/Users/thelightdisk/Development/code/SoundToggle/app/assets'

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

puts 'Begin seeding users...'

# Create users and assign the primary tag to each user
cloverleaf = User.create(
    username: "cloverleaf",
    email: "elliot.mangini@gmail.com",
    bio: "Nestled in the heart of the Como Park neighborhood of Saint Paul, Minnesota, Cloverleaf Audio-Visual is a vibrant recording studio that combines technical expertise, artistic passion, and a collaborative approach to create highly-polished recordings that captivate hearts and defy expectations. Ideal for independent artists seeking a studio experience that nurtures creativity, embraces individuality, and turns visions into reality.",
    password: "123123",
    tag: tags["engineer"], # Assigning "Engineer" tag to "cloverleaf"
    power: "admin",
    found_us: "Search",
)

# Attach an avatar
cloverleaf_avatar = Rails.root.join(assets_path, 'cloverleaf_Avatar.png').open
cloverleaf.avatar.attach(io: cloverleaf_avatar, filename: 'cloverleaf_Avatar.png', content_type: 'image/png')

cloverleafSite = Link.create(user: cloverleaf, tag: tags["website"], URL: "https://cloverleaf.audio/");
cloverleafSite = Link.create(user: cloverleaf, tag: tags["facebook"], URL: "https://www.facebook.com/cloverleafaudiovisual/");
cloverleafSite = Link.create(user: cloverleaf, tag: tags["soundcloud"], URL: "https://soundcloud.com/bigsistermusic");


educatordemo = User.create(
    username: "educator",
    email: "educator@test.com",
    bio: "I am an educator using SoundToggle in the classroom!",
    password: "123123",
    tag: tags["educator"],
    power: "pro",
)

remixerdemo = User.create(
    username: "remixer",
    email: "remixer@test.com",
    bio: "I am a remixer using SoundToggle to network with new artists!",
    password: "123123",
    tag: tags["remixer"],
    power: "standard"
)

puts 'Successfully seeded users! ✅✅✅✅✅'

puts 'Begin seeding playlist one...'
cloverleaf_favorite_mixes = Playlist.create!(
  name: "Favorite Mixes",
  blurb: "Toggle the 'Before' and 'After' switch below to hear how our post-production process changed the songs.",
  user: cloverleaf,
  featured: true,
  theme: classic_theme
)
cloverleaf.update(featured_playlist: cloverleaf_favorite_mixes)

puts 'Successfully created first playlist! ✅✅✅✅✅'

# Array of song titles
song_titles = [
  "Deafens Me",
  "Flame Keeper",
  "Forever (Stay)",
  "Simple Man",
  "What's His Name",
  "Wild Berry Smoothie"
]

# Arrays of artists and genres
artists = [
  'Marc Francis',
  'Analise Elle',
  'Zach King',
  'Silverseed',
  'The Owl-Eyes',
  'Knoel'
]

genres = [
  'Folk Rock',
  'Folk',
  'Acoustic Pop',
  'Rock',
  'Rock',
  'Pop'
]

# Loop through each song title and seed the data for the first playlist
song_titles.each_with_index do |title, index|

  # Create the song
  song = Song.create(
    primary_attribute: artists[index], # Use the corresponding artist name from the array
    secondary_attribute: genres[index],   # Use the corresponding genre from the array
    title: title,
    playlist: cloverleaf_favorite_mixes
  )

  # Create a "Before" model associated with the song
  before = song.build_before
  before.save

  # Create an "After" model associated with the song and set the attenuation
  after = song.build_after
  after.attenuation = -rand(0.0..6.0).round(1)
  after.save

  # Attach audio files to the "Before" and "After" models
  before_audio = Rails.root.join(assets_path, "#{title}_Before.mp3").open
  after_audio = Rails.root.join(assets_path, "#{title}_After.mp3").open

  before.audio.attach(io: before_audio, filename: "#{title}_Before.mp3", content_type: 'audio/mpeg')
  after.audio.attach(io: after_audio, filename: "#{title}_After.mp3", content_type: 'audio/mpeg')

  # Attach artwork to the song
  artwork_file = Rails.root.join(assets_path, "#{title}_Artwork.png").open
  song.artwork.attach(io: artwork_file, filename: "#{title}_Artwork.png", content_type: 'image/jpeg')
end

puts 'Successfully seeded songs with "Before," "After," and Artwork for the first playlist! ✅'

puts 'Begin seeding secondary playlist (using the first three songs)...'
secondary_playlist = Playlist.create(
  name: "Secondary Playlist Test",
  blurb: "This is a secondary playlist for testing.",
  user: cloverleaf,
  theme: togglify_theme
)

puts 'Successfully created "Secondary Playlist Test"! ✅'


# Loop through the first three song titles and seed the data for the second playlist
song_titles[0..2].each_with_index do |title, index|
  # Create the song
  song = Song.create(
    primary_attribute: artists[index], # Use the corresponding artist name from the array
    secondary_attribute: genres[index],   # Use the corresponding genre from the array
    title: title,
    playlist: secondary_playlist
  )

  # Create a "Before" model associated with the song
  before = song.build_before
  before.save

  # Create an "After" model associated with the song
  after = song.build_after
  after.attenuation = -rand(0.0..6.0).round(1)
  after.save

  # Attach audio files to the "Before" and "After" models
  before_audio = Rails.root.join(assets_path, "#{title}_Before.mp3").open
  after_audio = Rails.root.join(assets_path, "#{title}_After.mp3").open

  before.audio.attach(io: before_audio, filename: "#{title}_Before.mp3", content_type: 'audio/mpeg')
  after.audio.attach(io: after_audio, filename: "#{title}_After.mp3", content_type: 'audio/mpeg')

  # Attach artwork to the song
  artwork_file = Rails.root.join(assets_path, "#{title}_Artwork.png").open
  song.artwork.attach(io: artwork_file, filename: "#{title}_Artwork.png", content_type: 'image/jpeg')
end

puts 'Successfully seeded the second playlist with "Before," "After," and Artwork for the first three songs! ✅'


puts 'generating playlist URLs by triggering the before_save method on them.'
Playlist.all.each do |playlist|
  playlist.save
end


puts '🚨✅🏁 SEEDED SUCCESSFULLY!!!!!!!!! 🏁✅🚨'