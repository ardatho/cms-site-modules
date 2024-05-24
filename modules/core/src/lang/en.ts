export default {
  // Web site global label
  global: {
    site: 'Ardatho CMS',
    developed_by: 'Developed by',
    switchlang: 'Français',
    acronymLang: 'fr',
  },
  // Language label
  contentLang: {
    fr: 'French',
    en: 'English',
  },
  // User interface content
  ui: {
    welcome: 'Welcome',
    close: 'Close',
    login: 'Log in',
    logout: 'Logout',
    read: 'Read',
    edit: 'Edit',
    add: 'Add',
    export: 'Export',
    duplicate: 'Duplicate',
    copy_to: 'Copy to',
    copy: 'Copy',
    copy_link: 'Copy link',
    link_copied: 'Link copied',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    reset: 'Reset',
    search: 'Search',
    select_image: 'Select image',
    with_image: 'With image',
    without_image: 'Without image',
    delete: 'Delete',
    publish: 'Publish',
    unpublish: 'Unpublish',
    preview: 'Preview',
    new_draft: 'New draft',
    show_filters: 'Show filters',
    hide_filters: 'Hide filters',
    select_status: 'Select a status',
    select_items: 'Select',
    select_hour: 'Select hour',
    select_day: 'Select day',
    select_date_start: 'Start date',
    select_date_end: 'End date',
    show_treeview: 'Show in treeview',
    show_images: 'Show images',
    hide_images: 'Hide images',
    results: 'Result(s)',
    no_data: 'No data available',
    menu_expanded: 'Keep menu expanded',
    menu_minified: 'Minify menu',
    settings: 'Settings',
    general: 'General',
    home: 'Home',
    inbox: 'Inbox',
  },
  // Dialogs : every success alert
  dialogs: {
    login_success: 'You\'ve been logged in successfully!',
    logout_success: 'You\'ve successfully logged out!',
    token_expired: 'Your session has expired.',
    add_success: 'Add successful!',
    update_success: 'Update successful!',
    duplicate_success: 'Duplicate successful!',
    remove_success: 'Remove successful!',
    loading: 'Loading...',
    remove_title: 'Confirm Deletion',
    remove_subtitle: 'Are you sure you want to delete this item?',
    remove_subtitle_dynamic: 'Are you sure you want to delete the item "{title}"?',
    exit_without_saving_title: 'Exit without saving',
    exit_without_saving_subtitle: 'You have pending changes. Are you sure you want to exit this module without saving?',
    reset_password_success: 'You\'ve successfully reset your password! You can now login with you new credentials.',
  },
  // Warnings : every warnings alert
  warnings: {
    content_lang: 'The element has not been saved for this language.',
  },
  // Errors : every errors alert
  errors: {
    no_modules: 'You do not have access to modules. Please contact administrator for more information.',
    no_results: 'No results found',
    field_error_title: 'Unable to save',
    field_error_subtitle: 'Please review the {element} field',
    required: 'This field is required',
    link_wrong_format_abs: 'Invalid Link Format: The link should be absolute (http[s]://example.com)',
    link_wrong_format_abs_rel_email: 'Invalid Link Format: The link should be absolute (http[s]://example.com), relative (/example) or email type (mailto:john@example.com)',
    color_wrong_format: 'Invalid HEXA color (transparency is required: #xxxxxxFF)',
    max_300: 'Max. 300 characters',
    max: 'Max. {element} characters',
    error_occured: 'An error occured',
    login_error: 'Bad credentials',
    forgot_password_error: 'We could not find an existing active user with the email provided',
    translation_error: 'No translation for element {id}',
    date_invalid: 'Invalid date',
    phone_invalid: 'Invalid phone number',
    email_invalid: 'Invalid e-mail',
    price_invalid: 'Invalid price',
    multiple_errors: 'Looks like something went wrong, there are multiple errors in the form',
    form_contains: 'The form contains',
    error: 'error',
    errors: 'errors',
    password_format: 'The password must at least a capital letter and at least a number (without space, accent or special character) and between 8 and 20 characters',
    password_match: 'The passwords must match',
    wrong_format: 'The file {fileName} is not supported. The supported files are: {acceptedFormats}.',
    file_too_large: 'The file {fileName} is too large ({fileSize}/{sizeLimit}).',
  },
  // Login page
  login: {
    hi: 'Hi',
    title: 'Login',
    email: 'Email',
    password: 'Password',
    stay_logged_in: 'Stay logged in',
    subtitle: 'Enterprise Management System',
    forgot_password: 'Forgot password?',
    forgot_password_title1: 'Do you need to reset your password?',
    forgot_password_desc1: 'Please provide your email and we will send you a password reset link.',
    forgot_password_title2: 'Help is on the way!',
    forgot_password_desc2: 'You will get an email from us shortly. Once you have reset your password, log in to your account to continue.',
    email_forgot_password_title: 'Password Reset Notification',
    email_forgot_password_desc1: 'You recently requested to reset your password for your {site} account. Click the button below to reset it.',
    email_forgot_password_admin_desc1: 'If you did not request a password reset, please ignore this email and notify your',
    email_forgot_password_admin_desc2: 'System administrator',
    email_forgot_password_trouble_desc: 'If you\'re having trouble clicking the password reset button, copy and paste the URL below into your web browser:',
    reset_password: 'Reset your password',
    new_password: 'New password',
    confirm_password: 'Confirm password',
    back_to_login: 'Back to login',
    back: 'Back',
    submit: 'Submit',
    emails: {
      title: 'You told us you forgot your password.',
      desc: 'To safely reset your password, click on the button below:',
      action: 'Reset my password',
    },
  },
  // Dashboard main menu
  dashboard: {
    title: 'Dashboard',
    your_profile: 'Your profile information',
    recent_items: 'Your recent items',
    welcome: 'Welcome',
  },
  // Generic label
  generic: {
    general_info: 'General Info',
    online: 'Online',
    offline: 'Offline',
    inprogress: 'Edit In progress',
    approvalinprogress: 'Approval In progress',
    email: 'Email',
    first_name: 'First name',
    last_name: 'Last name',
    family_name: 'Family name',
    fullname: 'Name',
    date: 'Date',
    list: 'List',
    state: 'State',
    link: 'Link',
    actions: 'Action(s)',
    rows_per_page: 'Rows per page',
    main_group: 'General information',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    tags: 'Tags',
    edit_tag: 'Edit tags',
    image: 'Image',
    video: 'Video',
    pdf: 'PDF',
    zip: 'Zip',
    ppt: 'Powerpoint',
    docx: 'Microsoft Word',
    filename: 'File name',
    color: 'Color',
    created_since: 'Created',
    not_applicable: 'Not applicable',
    url: 'URL',
    contact_us: 'Contact us',
    select_value: 'Select a value',
    select_date: 'Select a date',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    padding: 'Padding',
    margin: 'Margin',
    name: 'Name',
    dimensions: 'Dimensions',
    weight: 'Weight',
    infos: 'Infos',
    or: 'or',
    drop_file_here: 'Drag and drop file here',
    or_browse: 'Or browse from:',
    browse_computer: 'Your computer',
    browse_library: 'The media library',
    live: 'Live',
    draft: 'Draft',
    archived: 'Archived',
    code: 'Code',
    internal_notes: 'Internal notes',
    phone: 'Phone',
    birthdate: 'Birthdate',
    address: 'Address',
    city: 'City',
    postal_code: 'Postal code',
    lang: 'Language',
    original_file: 'View Original File',
  },
  units: {
    kb: 'KB',
    mb: 'MB',
    gb: 'GB',
  },
  report: {
    bug_report: 'Report a bug',
    bug_report_description: 'If you have encountered an error or noticed any behavior that was not expected, please report it to us. You can use the fields below to give details on the bug that was encountered. Feel free to add screen captures to help us locate the error. All fields identified by an asterisk (*) are mandatory.',
    feedback: 'Feedback / Suggestions',
    feedback_description: 'Do you want to share with us your opinion about the product? Maybe you have ideas about a feature that would be useful to you? We are always happy to hear feedback and suggestions from our users.',
    subject: 'Subject',
    files: 'Attach files (optional)',
    send: 'Send report',
    send_success: 'The report has been sent successfully. Thank you!',
    send_failed: 'An error occured when sending the message. Please try again.',
  }
};