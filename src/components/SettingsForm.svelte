<script lang="ts">
  import {onMount, getContext} from "svelte";
  import {user} from "../stores";

  let loggedInUser;
  let firstName = "";
  let lastName = "";
  let email = $user.email;
  let password = ""
  let message = "";

  const hiveTracker = getContext("HiveTracker");

  async function save() {
    //loggedInUser = await hiveTracker.getUserByEmail($user.email);
    console.log(firstName, lastName, email, password, loggedInUser._id);
    let success = await hiveTracker.update(firstName, lastName, email, password, loggedInUser._id)
    if (success) {
      message = "Settings updated";
    } else {
      message = "Error Trying to save settings. Check all Fields are correct";
    }
  };

  onMount(async () => {
    loggedInUser = await hiveTracker.getUserByEmail($user.email);
    firstName = loggedInUser.firstName;
    lastName = loggedInUser.lastName;
  });
</script>

<form on:submit|preventDefault={save}>
  <div class="uk-margin uk-text-left">
    <div class="uk-margin">
      <label class="uk-form-label" >First name: Single word and must begin with a capitol letter</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={firstName}
                                                                       class="uk-input uk-form-large" type="text"
                                                                       name="firstName">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" >Last name must begin with a capitol letter</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={lastName}
                                                                       class="uk-input uk-form-large" type="text"
                                                                       name="lastName">
      </div>
    </div>
    <label class="uk-form-label">Must be valid email address</label>
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: mail"></span> <input bind:value={email} class="uk-input uk-form-large"
                                                                     type="text" name="email">
    </div>
    <div class="uk-margin">
      <label class="uk-form-label">Password: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and
        one special character "@$!%*?&"</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: lock"></span> <input bind:value={password}
                                                                       class="uk-input uk-form-large" type="password"
                                                                       name="password"
                                                                       placeholder="New Password or Existing password">
      </div>
    </div>
  </div>
  <div class="uk-margin">
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Save Settings</button>
  </div>
  {#if message}
    <div class="uk-text-left uk-text-small">
      {message}
    </div>
  {/if}
</form>
