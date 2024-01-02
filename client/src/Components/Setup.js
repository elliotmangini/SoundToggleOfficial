import style from "../StyleSheets/Setup.module.css";

import AddTrack from '../Assets/sc_add_track.png';
import UploadVersions from '../Assets/sc_upload_versions.png';
import StatusIndicators from '../Assets/sc_status_indicators.png';
import AddArtwork from '../Assets/sc_add_artwork.png';
import EditSong from '../Assets/sc_edit_song.png';
import EditingSong from '../Assets/sc_song_as_edited.png';
import SwapSong from '../Assets/sc_swap_song.png';
import DeleteSong from '../Assets/sc_delete_song.png';
import PresetThemes from '../Assets/sc_preset_themes.png';
import ThemeParams from '../Assets/sc_theme_params.png';
import MoreParams from '../Assets/sc_more_params.png';
import URLShare from '../Assets/sc_url_share.png';
import ExportButton from '../Assets/sc_export_button.png';
import ProfileEdit from '../Assets/sc_profile_edit.png';
import ProfileSave from '../Assets/sc_profile_save.png';
import ContactUs from '../Assets/sc_contact_button.png';



export default function Setup() {
    return (
        <div className={style.setup_page}>
          <section>
            <h1 className={style.welcome}>
            How To Use <span>SoundToggle</span>: A Comprehensive Guide
            </h1>
            <div className={style.youtube_container}><iframe className={style.youtube_iframe} width="560" height="315" src="https://www.youtube.com/embed/eCoCOX9bbBM?si=UzPJNaq1LPT60S2j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
            <p style={{ fontStyle: "italic"}}>If you're not sure where to begin get the <span>full tour</span> in 10 minutes,<br/>- Matt Ebso & Elliot Mangini</p>
          </section>
    
          <section>
            <h2>Intro To Playlist Editor</h2>
            <p>
            Welcome to Sound Toggle, where you can create and customize your own “Before and After” comparison playlists with ease. In this guide, we'll walk you through the various features of the playlist editor, helping you set up your first Sound Toggle playlist.
            </p>
          </section>

          <section>
            <h2>Managing Your Tracks</h2>

            <h3>Adding A Track</h3>
            <p>
            To begin, let's explore how to add a track to your playlist. Within the playlist editor, you'll find a top section for theme editing and a lower section for track management. Click on the "Add Track" button in the track editor to start the process. Input your track details, such as title, artist, and genre.
            </p>
            <img className={style.half_width_image} src={AddTrack}></img>
            <p>
            Once track details are added, upload your audio files with the big + buttons. Version A goes on the left, and Version B goes on the right.
            </p>
            <img className={style.half_width_image} src={UploadVersions}></img>
            <p>
            The status indicator shows whether or not your track is ready for public viewing. The red X indicates that there is an issue. Ensure you’ve successfully uploaded both tracks if you see this. A green checkmark indicates that both audio files have been uploaded and the track is ready to be published.
            </p>
            <img src={StatusIndicators}></img>

            <h3>Adding Artwork</h3>
            <p>
            Enhance the visual appeal of your playlist by adding artwork. Replace the default artwork by uploading your own cover image. This step ensures your playlist stands out and aligns with your personal aesthetic.
            </p>
            <img className={style.half_width_image} src={AddArtwork}></img>

            <h3>Editing Track Details</h3>
            <p>
            Need to edit track details? Click on the pencil icon to the left of the track title, make the necessary changes, and click the flashing floppy disk icon to save. This is handy for updating information or correcting any errors in your playlist.
            </p>
            <img className={style.half_width_image} src={EditSong}></img>
            <p><em>leads to...</em></p>
            <img className={style.half_width_image} src={EditingSong}></img>

            <h3>Swapping Audio Files</h3>
            <p>
            Perfect your playlist by swapping audio files when needed. Hover over the relevant file, click the pencil icon, and select a new file for seamless audio file replacement.
            </p>
            <img className={style.half_width_image} src={SwapSong}></img>

            <h3>Deleting A Track</h3>
            <p>
            Remove unwanted tracks effortlessly. Click on the trashcan icon next to the track you want to delete, confirm your action, and voila – the track is deleted successfully.
            </p>
            <img className={style.half_width_image} src={DeleteSong}></img>
          </section>

          <section>
            <h2>Styling The Player</h2>

            <h3>Theme Presets</h3>
            <p>
            Customize the look of your player using theme presets. Choose from Classic, Modern, or Togglify themes. Experiment with different themes to find the one that suits your style. Remember to click “Save Changes” before previewing or publishing your playlist.
            </p>
            <img className={style.half_width_image} src={PresetThemes}></img>

            <h3>Customizing Colors</h3>
            <p>
            Go beyond presets by customizing individual colors within the player. Adjust background colors, button fills, text colors, and more to match your branding or personal preferences. Use the handy color selector, or add your colors with RGB, HSL, or HEX values. Explore the Theme Editor to make your Sound Toggle player uniquely yours.
            </p>
            <ul className={style.quick_list}>
              <li>Panel = Background</li>
              <li>Buttons = Button Body</li>
              <li>Button Fill = Button Text and Icons</li>
              <li>Selected = Highlight Color for the Selected Song in the Playlist</li>
              <li>Text One = Track Title</li>
              <li>Text Two = Other Text Elements</li>
              <li>Toggle = Background Color of Toggle in Its "Toggled" State</li>
            </ul>

            <img className={style.half_width_image} style={{marginTop: "1rem"}} src={ThemeParams}></img>
            
            <h3>Additional Parameters</h3>
            <p>
            Fine-tune your player further by exploring additional parameters. Modify corner styles, enable or disable the glowing artwork effect, and personalize the toggle text labels. The author link is your username and links to your playlist on SoundToggle. Save your changes to see the updated appearance of your player.
            </p>
            <img className={style.half_width_image} src={MoreParams}></img>
          </section>

          <section>
            <h2>Sharing Your Player</h2>

            <h3>Direct URL</h3>
            <p>
            Share your playlist by providing the direct URL in your browser. Your featured playlist is https://soundtoggle.io/ followed by your username. Copy and share the link with friends or colleagues. Ensure you're logged out to see how the public views your playlist.
            </p>
            <img className={style.half_width_image} src={URLShare}></img>

            <h3>Website Embedding</h3>
            <p>
            Embed your player directly into a website. Click the export button. The iframe HTML code snippet will be copied to your clipboard. Paste it into your website's code. Most major CMS website builders will provide low code and no code functionality for you to add custom code to your website without any coding knowledge required. (See the list of tutorial links below.) Preview to ensure it looks great on your site.
            </p>
            <img className={style.half_width_image} src={ExportButton}></img>

            <h4>Embedding Tutorials</h4>
            <ul className={style.quick_list}>
              <li><a href="https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site">Embed on Wix</a></li>
              <li><a href="https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-code-to-your-site">Embed on Squarespace</a></li>
              <li><a href="https://wordpress.com/support/wordpress-editor/blocks/custom-html-block/">Embed on Wordpress</a></li>
              <li><a href="https://www.weebly.com/app/help/us/en/topics/create-widgets-embed-code-and-add-external-content">Embed on Weebly</a></li>
            </ul>

            <h3>Author & Playlist Info</h3>
            <p>
            Add a personal touch to your playlist by including author and playlist information. Click "Edit" at the bottom of the editor section to share a brief message about yourself or the playlist. Click “Update” to confirm your text changes.
            </p>
            <img className={style.half_width_image} src={ProfileEdit}></img>
            <p><em>be sure to save...</em></p>
            <img className={style.half_width_image} src={ProfileSave}></img>
          </section>

          <section>
            <h2>Still Need Help?</h2>
            <p>
            If you encounter <em>any</em> issues, have suggestions, or need further assistance, click on the chat bubble in the bottom right corner to send us a message. We're here to help make your Sound Toggle experience enjoyable.
            </p>
            <div className={style.circle_crop}><img className={style.circle_image} src={ContactUs}></img></div>
            <p><span><em>Thanks for joining us, and happy toggling!</em></span></p>
          </section>

        </div>
      );
}
