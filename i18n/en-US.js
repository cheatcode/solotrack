const en_US = {
  app_navigation: {
    logo: {
      alt: 'Solotrack',
    },
    links: {
      projects: 'Projects',
    },
    user_menu: {
      profile: 'Profile',
      dark_mode: 'Dark Mode',
      logout: 'Logout',
    },
  },
  confirm_delete_attachment: {
    title: 'Delete Attachment?',
    subtitle: 'Are you sure? This will permanently delete the attachment.',
    action: {
      cancel: 'Cancel',
      confirm: 'Yes, Delete'
    },
  },
  confirm_delete_project: {
    title: 'Delete Project?',
    subtitle: 'Are you sure? This will permanently delete the project and all of its tasks.',
    action: {
      cancel: 'Cancel',
      confirm: 'Yes, Delete'
    },
  },
  confirm_delete_tag: {
    title: 'Delete Tag?',
    subtitle: 'Are you sure? This will permanently delete the tag on this task.',
    action: {
      cancel: 'Cancel',
      confirm: 'Yes, Delete'
    },
  },
  confirm_delete_task: {
    title: 'Delete Task?',
    subtitle: 'Are you sure? This will permanently delete the task.',
    action: {
      cancel: 'Cancel',
      confirm: 'Yes, Delete'
    },
  },
  error: {
    page_not_found: 'Page Not Found',
    double_check_url: 'Double-check the URL and try again.',
  },
  login: {
    logo_alt: 'Solotrack',
    title: 'Welcome Back',
    no_account: "Don't have an account?",
    sign_up: 'Sign up',
    email_address_label: 'Email Address',
    email_address_placeholder: 'Email Address',
    password_label: 'Password',
    forgot_password: 'Forgot your password?',
    password_placeholder: 'Password',
    log_in_button: 'Log In to Solotrack',
    validation: {
      email_address_required: 'Email address is required.',
      email_address_invalid: 'Must use a valid email address.',
      password_required: 'Password is required.',
    },
    error_toast: {
      title: 'Login Error',
    },
  },
  project: {
    blank_state: {
      todo: {
        title: 'No Tasks',
        subtitle: 'To add your first task, use the input below.',
      },
      done: {
        title: 'No Completed Tasks',
        subtitle: 'Completed tasks will show here once they\'ve been marked complete.',
      },
    },
    breadcrumbs: {
      projects: 'Projects',
    },
    header: {
      search: {
        placeholder: 'Search tasks by title or #tags...'
      },
    },
    menu: {
      edit_name: 'Edit Name',
      delete_project: 'Delete Project'
    },
    tabs: {
      todo: 'Todo',
      done: 'Done'
    },
    toasts: {
      update_project_error: 'Update Project Error',
      delete_project_error: 'Delete Project Error',
      create_post_error: 'Create Post Error',
      delete_task: 'Delete Task',
      delete_task_success: 'Task successfully deleted!',
      delete_task_error: 'Delete Task Error',
      update_task_error: 'Update Task Error',
      search_tasks_error: 'Search Tasks Error'
    },
    task: {
      placeholder: 'Type your task and any #tags here, then press enter...',
    },
    tasks: {
      edit_task: 'Edit Task',
      delete_task: 'Delete Task',
    },
  },
  projects: {
    header: {
      search: {
        placeholder: 'Search projects...',
      },
      action: {
        label: 'New Project',
      },
    },
    blank_state: {
      no_projects: {
        title: 'You Don\'t Have Any Projects',
        subtitle: 'To create your first project, click the button below.',
        action: {
          label: 'Create Your First Project',
        },
      }
    },
  },
  recover_password: {
    logo_alt: 'Solotrack',
    title: 'Recover Your Password',
    remember_password: 'Remember your password?',
    log_in: 'Log in',
    email_address_label: 'Email Address',
    email_address_placeholder: 'Email Address',
    send_reset_link_button: 'Send Reset Link',
    validation: {
      email_address_required: 'Email address is required.',
      email_address_invalid: 'Must use a valid email address.',
    },
    success_toast: {
      title: 'Password Reset',
      message: 'Check your email for a password reset link!',
    },
    error_toast: {
      title: 'Recover Password Error',
    },
  },
  reset_password: {
    logo_alt: 'Solotrack',
    title: 'Reset Your Password',
    new_password_label: 'New Password',
    new_password_placeholder: 'New Password',
    repeat_new_password_label: 'Repeat New Password',
    repeat_new_password_placeholder: 'Repeat New Password',
    reset_password_button: 'Reset Password',
    validation: {
      new_password_required: 'New password is required.',
      new_password_min_length: 'Must use at least 8 characters.',
      repeat_new_password_required: 'Must repeat new password.',
      passwords_must_match: 'Passwords must match.',
    },
    error_toast: {
      title: 'Reset Password Error',
    },
  },
  signup: {
    logo_alt: 'Solotrack',
    title: 'First, Create an Account',
    already_have_account: 'Already have an account?',
    log_in: 'Log in',
    first_name_label: 'First Name',
    first_name_placeholder: 'First Name',
    last_name_label: 'Last Name',
    last_name_placeholder: 'Last Name',
    email_address_label: 'Email Address',
    email_address_placeholder: 'Email Address',
    password_label: 'Password',
    password_placeholder: 'Password',
    password_hint: 'Hint: use at least 8 characters.',
    create_account_button: 'Create Account',
    validation: {
      first_name_required: 'First name is required.',
      last_name_required: 'Last name is required.',
      email_address_required: 'Email address is required.',
      email_address_invalid: 'Must use a valid email address.',
      password_required: 'Password is required.',
      password_min_length: 'Must use at least 8 characters.',
    },
    error_toast: {
      title: 'Signup Error',
    },
  },
  profile: {
    section: {
      account: 'Account',
      password: 'Password',
    },
    form: {
      first_name_label: 'First Name',
      first_name_placeholder: 'First Name',
      last_name_label: 'Last Name',
      last_name_placeholder: 'Last Name',
      email_address_label: 'Email Address',
      email_address_placeholder: 'Email Address',
      new_password_label: 'New Password',
      new_password_placeholder: 'New Password',
      repeat_new_password_label: 'Repeat New Password',
      repeat_new_password_placeholder: 'Repeat New Password',
      save_profile_button: 'Save Profile',
      change_password_button: 'Change Password',
    },
    validation: {
      first_name_required: 'First name is required.',
      last_name_required: 'Last name is required.',
      email_address_required: 'Email address is required.',
      email_address_invalid: 'Must be a valid email address.',
      new_password_required: 'New password is required.',
      new_password_min_length: 'Must use at least 8 characters.',
      repeat_new_password_required: 'Must repeat new password.',
      passwords_must_match: 'Passwords must match.',
    },
    toasts: {
      update_profile_title: 'Update Profile',
      update_profile_success: 'Profile successfully updated!',
      update_profile_error: 'Update Profile Error',
      change_password_title: 'Change Password',
      change_password_success: 'Password successfully changed!',
      change_password_error: 'Change Password Error',
    },
  },
};

export default en_US;
