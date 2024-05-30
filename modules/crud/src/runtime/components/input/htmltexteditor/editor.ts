/* Import TinyMCE */
import tinymce from 'tinymce';

/* Default icons are required. After that, import custom icons if applicable */
import 'tinymce/icons/default/icons.min.js';

/* Required TinyMCE components */
import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/models/dom/model.min.js';

/* Import a skin (can be a custom skin instead of the default) */
import 'tinymce/skins/ui/oxide/skin.js';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';

/* Import premium plugins */
/* NOTE: Download separately and add these to /src/plugins */
/* import './plugins/<plugincode>'; */

/* content UI CSS is required */
import contentUiSkinCss from 'tinymce/skins/ui/oxide/content.js';

/* The default content CSS can be changed or replaced with appropriate CSS for the editor content. */
import contentCss from 'tinymce/skins/content/default/content.js';

/* Initialize TinyMCE */
export function render () {
  tinymce.init({
    menubar: false,
    height: 250,
    selector: 'textarea#editor',
    plugins: 'lists link code paste',
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | removeformat | code',
    // skin_url: 'default',
    // content_css: 'default',
    toolbar_mode: 'wrap',
    mobile: {
      toolbar_mode: 'wrap',
    },
  });
};
