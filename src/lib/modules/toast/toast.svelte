<script lang="ts">
  import { fade } from 'svelte/transition';

  export let notification = {} as any;
  export let withoutStyles = false;
  export let onRemove = null;

  const { text, type } = notification;

  const getClass = (suffix?: string) => {
    const defaultSuffix = suffix ? `-${suffix}` : '';
    const defaultNotificationClass = ` default-notification-style${defaultSuffix}`;
    const defaultNotificationType =
      type && !suffix ? ` default-notification-${type}` : '';

    return `notification${defaultSuffix}${
      withoutStyles ? '' : defaultNotificationClass
    }${defaultNotificationType}`;
  };
</script>

<div
  class={`${getClass()} flex items-center`}
  role="status"
  aria-live="polite"
  in:fade
  out:fade
>
  <div class={getClass('content')}>
    <slot>{text}</slot>
  </div>
  <button
    class={getClass('button')}
    on:click={onRemove}
    aria-label="delete notification"
  >
    &times;
    <!-- <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"
      ><path
        fill="currentColor"
        d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"
      /></svg
    > -->
  </button>
</div>

<style>
  .default-notification-style {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 12px;
    /* background: #fff; */
    background: rgba(11, 12, 13, 1);
    /* color: #000; */
    color: rgba(227, 229, 231, 1);
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    min-height: 0;
    /* min-width: 200px; */
    overflow: hidden;
  }

  .default-notification-style-content {
    /* width: 210px; */
    padding: 12px 6px 12px 12px;
    box-sizing: border-box;
    word-wrap: break-word;
  }

  .default-notification-style-button {
    display: block;
    /* width: 40px; */
    padding: 10px;
    margin: 0;
    border: none;
    /* border-left: 1px solid #eee; */
    outline: none;
    background: none;
    cursor: pointer;
    font-size: 20px;
    /* color: #000; */
    color: rgba(227, 229, 231, 1);
    box-sizing: border-box;
  }

  .default-notification-style-button:hover {
    background: rgba(0, 0, 0, 0.01);
  }

  .default-notification-danger {
    background: #f3555a;
    color: #fff;
  }

  .default-notification-danger .default-notification-style-button {
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    color: #fff;
  }

  .default-notification-warning {
    background: #ffb900;
    color: #000;
  }

  .default-notification-warning .default-notification-style-button {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    color: #000;
  }

  .default-notification-success {
    background: #22ce6c;
    color: #fff;
  }

  .default-notification-success .default-notification-style-button {
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    color: #fff;
  }
</style>
