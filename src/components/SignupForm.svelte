<script lang="ts">
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let firstName = "";
  let lastName = "";
  let email = ""
  let password = "";
  let errorMessage = "";

  const hiveTracker = getContext("HiveTracker");

  async function signup() {
    let success = await hiveTracker.signup(firstName, lastName, email, password)
    if (success) {
      push("/login");
    } else {
      errorMessage = "Error Trying to sign up";
    }
  }
</script>

<form on:submit|preventDefault={signup}>
  <div class="uk-margin uk-text-left">
    <div class="uk-margin">
      <label class="uk-form-label" >First name: Single word and must begin with a capitol letter</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: user" ></span>
        <input bind:value={firstName} class="uk-input uk-form-large" type="text" name="firstName" placeholder="First Name">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" >Last name must begin with a capitol letter</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: user"></span>
        <input bind:value={lastName} class="uk-input uk-form-large" type="text" name="lastName" placeholder="Last Name">
      </div>
    </div>
    <label class="uk-form-label">Must be valid email address</label>
    <div class="uk-inline uk-width-1-1">
      <span class="uk-form-icon" uk-icon="icon: mail"></span>
      <input bind:value={email} class="uk-input uk-form-large" type="text" name="email" placeholder="Email">
    </div>
    <div class="uk-margin">
      <label class="uk-form-label">Password: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and
        one special character "@$!%*?&"</label>
      <div class="uk-inline uk-width-1-1">
        <span class="uk-form-icon" uk-icon="icon: lock"></span>
        <input bind:value={password} class="uk-input uk-form-large" type="password" name="password" placeholder="Password">
      </div>
    </div>
  </div>
  <div class="uk-margin">
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Sign up</button>
  </div>
  {#if errorMessage}
    <div class="uk-text-left uk-text-small">
      {errorMessage}
    </div>
  {/if}
</form>
