# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_08_171552) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.integer "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "afters", force: :cascade do |t|
    t.integer "song_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "attenuation", precision: 4, scale: 1, default: "-6.0"
    t.index ["song_id"], name: "index_afters_on_song_id"
  end

  create_table "befores", force: :cascade do |t|
    t.integer "song_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "attenuation", precision: 4, scale: 1, default: "0.0"
    t.index ["song_id"], name: "index_befores_on_song_id"
  end

  create_table "links", force: :cascade do |t|
    t.string "URL"
    t.integer "tag_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_links_on_tag_id"
    t.index ["user_id"], name: "index_links_on_user_id"
  end

  create_table "playlist_tags", force: :cascade do |t|
    t.integer "playlist_id", null: false
    t.integer "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id", "tag_id"], name: "index_playlist_tags_on_playlist_id_and_tag_id", unique: true
    t.index ["playlist_id"], name: "index_playlist_tags_on_playlist_id"
    t.index ["tag_id"], name: "index_playlist_tags_on_tag_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "name", default: "Main"
    t.text "blurb"
    t.integer "user_id", null: false
    t.integer "theme_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "featured", default: false
    t.string "playlist_url"
    t.index ["theme_id"], name: "index_playlists_on_theme_id"
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "primary_attribute"
    t.string "secondary_attribute"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.integer "playlist_id"
    t.index ["playlist_id"], name: "index_songs_on_playlist_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "themes", force: :cascade do |t|
    t.string "primary_color", default: "#FFFFFF"
    t.string "secondary_color", default: "#394153"
    t.string "tertiary_color", default: "#1c627a"
    t.string "panel_style", default: "rounded"
    t.boolean "glow", default: true
    t.string "primary_attribute_name", default: "Artist"
    t.string "secondary_attribute_name", default: "Genre"
    t.boolean "display_user", default: true
    t.boolean "display_blurb", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", default: "custom"
    t.string "background_color", default: "#004f6b"
    t.string "untoggled_name", default: "BEFORE"
    t.string "toggled_name", default: "AFTER"
    t.string "text_primary_color", default: "#f4f4f4"
    t.string "text_secondary_color", default: "#bcd0d7"
    t.string "toggle_text_color", default: "#394153"
    t.string "toggle_highlight_color", default: "#EEC643"
    t.string "access"
  end

  create_table "tickets", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "tag_id", null: false
    t.string "subject", null: false
    t.text "body", null: false
    t.boolean "is_resolved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "version_id"
    t.index ["tag_id"], name: "index_tickets_on_tag_id"
    t.index ["user_id"], name: "index_tickets_on_user_id"
    t.index ["version_id"], name: "index_tickets_on_version_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "bio"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "space_used", default: 0, null: false
    t.integer "plan", default: 0, null: false
    t.integer "tag_id"
    t.integer "featured_playlist_id"
    t.string "power", default: "free"
    t.string "found_us"
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.index ["featured_playlist_id"], name: "index_users_on_featured_playlist_id"
    t.index ["tag_id"], name: "index_users_on_tag_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "release"
    t.string "name"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "afters", "songs"
  add_foreign_key "befores", "songs"
  add_foreign_key "links", "tags"
  add_foreign_key "links", "users"
  add_foreign_key "playlist_tags", "playlists"
  add_foreign_key "playlist_tags", "tags"
  add_foreign_key "playlists", "themes"
  add_foreign_key "playlists", "users"
  add_foreign_key "songs", "playlists"
  add_foreign_key "tickets", "tags"
  add_foreign_key "tickets", "users"
  add_foreign_key "tickets", "versions"
  add_foreign_key "users", "playlists", column: "featured_playlist_id"
  add_foreign_key "users", "tags"
end
