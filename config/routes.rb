Rails.application.routes.draw do
    resources :links
    resources :versions
    resources :tickets
    resources :playlist_tags
    resources :tags
    resources :themes
    resources :playlists
    resources :afters
    resources :befores
    resources :songs
    resources :password_resets

    post 'upload', to: 'songs#upload_song'
    post "songs/:id/before", to: "songs#set_before"
    post "songs/:id/after", to: "songs#set_after"
    post "/songs/:id/artwork", to: "songs#set_artwork"

    get "/playlists/:username/:playlist_url", to: "playlists#show"

    get '/current_version', to: 'versions#latest'
    get '/free_themes', to: 'themes#free'
    get '/newsletter', to: 'users#newsletter'

    patch "/users/bio", to: "users#update_bio"
    resources :users
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post "/avatar", to: "users#set_avatar"
    get '/users/public_profile/:username', to: 'users#public_profile'
end