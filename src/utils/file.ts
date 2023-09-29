import * as fs from 'node:fs';

/**
 * The `removeFile` function is used to delete a file at the specified path.
 * @param {string} path - The `path` parameter is a string that represents the file path of the file
 * you want to remove.
 */
export const removeFile = (path: string) => {
  try {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
};
