<script >
  import { getContext, onMount } from "svelte";
  import Coordinates from "./Coordinates.svelte";
  import { user } from "../stores";
  import addHive from "../pages/addHive.svelte"

  const hiveTracker = getContext("HiveTracker");

  export let justAddedHive;
  export let latitude = 0.0;
  export let longtitude = 0.0;

  let comments = " ";
  let description = "";
  let selectedType = 0;
  let type = ["Super", "National", "Langstroth", "Top Bar", "Warré"];
  let errorMessage = "";
  let owner = {};

  onMount(async () => {

    owner = await hiveTracker.getUserByEmail( $user.email);
    if (!owner){
      console.log("owner not found")
    }
  });

  async function createHive() {
    if (owner){
      const success = await hiveTracker.createHive(
      latitude,
      longtitude,
      type[selectedType],
      description,
      owner._id,
      comments
    );
    if (success) {
      if (justAddedHive)
        justAddedHive({
          latitude: latitude,
          longtitude: longtitude,
        });
    } else {
      errorMessage = "Hive Not Added not completed - some error occurred";
    }
    }else{
      errorMessage = "Could not find user"
    }

  }
</script>

<div
  class="uk-margin  uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
>
  <form
    on:submit|preventDefault={createHive}
    class="uk-form-stacked uk-text-left"
  >
    <fieldset class="uk-fieldset">


          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text"
              >ADD HIVE DETAILS</label
            >
            <div class="uk-margin">
              <div class="uk-form-controls">
                <input
                  bind:value={description}
                  class="uk-input large uk-card-hover"
                  id="form-stacked-text"
                  type="text"
                  name="description"
                  placeholder="description"
                />
              </div>
            </div>
            <div class="uk-margin">
              <textarea
                bind:value={comments}
                class="uk-textarea uk-card-hover"
                id="form-stacked-text"
                type="text"
                name="comments"
                placeholder="comments"
                rows="5"
              />
            </div>
          </div>
          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">Type of Hive
              <label
                ><input
                  bind:group={selectedType}
                  value={0}
                  class="uk-radio"
                  type="radio"
                  name="method"
                />
                {type[0]}
              </label><br />
              <label
                ><input
                  bind:group={selectedType}
                  value={1}
                  class="uk-radio"
                  type="radio"
                  name="method"
                />
                {type[1]}
              </label><br>
              <label
                ><input
                  bind:group={selectedType}
                  value={2}
                  class="uk-radio"
                  type="radio"
                  name="method"
                />
                {type[2]}
              </label><br />
              <label
                ><input
                  bind:group={selectedType}
                  value={3}
                  class="uk-radio"
                  type="radio"
                  name="method"
                />
                {type[3]}
              </label><br />
              <label
                ><input
                  bind:group={selectedType}
                  value={4}
                  class="uk-radio"
                  type="radio"
                  name="method"
                />
                {type[4]}
              </label><br />
          </div>
        <div class=" uk-width-1-2@m">
          {#if errorMessage}
            <div class="uk-text-left uk-text-small">
              {errorMessage}
            </div>
          {/if}
        </div>

      <Coordinates bind:latitude bind:longtitude />
      <div class="uk-margin">
        <button
          class="submit uk-button uk-button-primary  uk-button-large uk-width-1-1"
          >add hive</button
        >
      </div>
    </fieldset>
  </form>
</div>
