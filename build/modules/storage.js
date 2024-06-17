import { storage_prefix } from './common.js';

/**
 * Module for storage related functions.
 * @module modules/storage.js
 */


/**
 * Add an entry to the extension storage.
 * If the entry already exists, it will be overwritten.
 * @param {string} name - The name of the entry.
 * @param {any} value - The value to add.
 * @param {boolean} [sync=true] - Use storage.sync instead of storage.local?
 */

async function storage_add(name, value, sync = true) {
  let object = {};
  object[storage_prefix + name] = value;

  // We check if syncing is enabled

  let sync_enabled =
    sync == true ? await browser.storage.local.get(storage_prefix + "sync") : false;

  if (sync_enabled) {
    await browser.storage.sync.set(object);
  } else {
    await browser.storage.local.set(object);
  }
}

/**
 * Get an entry from the extension storage.
 * @param {string} name - The name of the entry.
 * @param {boolean} [sync=true] - Use storage.sync instead of storage.local?
 */

async function storage_get(name, sync = true) {
  // We check if syncing is enabled

  let sync_enabled =
    sync == true ? await browser.storage.local.get(storage_prefix + "sync") : false;

  let return_value = null; 
  if (sync_enabled) {
    return_value = await browser.storage.sync.get(storage_prefix + name);
  } else {
    return_value = await browser.storage.local.get(storage_prefix + name);
  }
  return return_value[storage_prefix + name];
}

export { storage_add, storage_get };
