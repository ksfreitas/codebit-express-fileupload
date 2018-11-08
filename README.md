# codebit-express-fileupload
Simple express middleware for uploading files.

[![npm](https://img.shields.io/npm/v/codebit-express-fileupload.svg)](https://www.npmjs.org/package/codebit-express-fileupload)

# Install
```bash
# With NPM
npm install --save codebit-express-fileupload
```

# Usage
When you upload a file, the file will be accessible from `req.files`.

Example:
* You're uploading a file called **car.jpg**
* Your input's name field is **foo**: `<input name="foo" type="file" />`
* In your express server request, you can access your uploaded file from `req.files.foo`:
```javascript
app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});
```

The **req.files.foo** object will contain the following:
* `req.files.foo.name`: "car.jpg"
* `req.files.foo.mimetype`: The mimetype of your file
* `req.files.foo.file`: Temporary file that was uploaded to server (should be manually removed)
* `req.files.foo.truncated`: A boolean that represents if the file is over the size limit

### Using Busboy Options
Pass in Busboy options directly to the express-fileupload middleware. [Check out the Busboy documentation here.](https://github.com/mscdex/busboy#api)

```javascript
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
```

### Available Options
Pass in non-Busboy options directly to the middleware. These are express-fileupload specific options.

Option | Acceptable&nbsp;Values | Details
--- | --- | ---
createParentPath | <ul><li><code>false</code>&nbsp;**(default)**</li><li><code>true</code></ul> | Automatically creates the directory path specified in `.mv(filePathName)`
safeFileNames | <ul><li><code>false</code>&nbsp;**(default)**</li><li><code>true</code></li><li>regex</li></ul> | Strips characters from the upload's filename. You can use custom regex to determine what to strip. If set to `true`, non-alphanumeric characters _except_ dashes and underscores will be stripped. This option is off by default.<br /><br />**Example #1 (strip slashes from file names):** `app.use(fileUpload({ safeFileNames: /\\/g }))`<br />**Example #2:** `app.use(fileUpload({ safeFileNames: true }))`
preserveExtension | <ul><li><code>false</code>&nbsp;**(default)**</li><li><code>true</code></li><li><code>*Number*</code></li></ul> | Preserves filename extension when using <code>safeFileNames</code> option. If set to <code>true</code>, will default to an extension length of 3. If set to <code>*Number*</code>, this will be the max allowable extension length. If an extension is smaller than the extension length, it remains untouched. If the extension is longer, it is shifted.<br /><br />**Example #1 (true):**<br /><code>app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));</code><br />*myFileName.ext* --> *myFileName.ext*<br /><br />**Example #2 (max extension length 2, extension shifted):**<br /><code>app.use(fileUpload({ safeFileNames: true, preserveExtension: 2 }));</code><br />*myFileName.ext* --> *myFileNamee.xt*
abortOnLimit | <ul><li><code>false</code>&nbsp;**(default)**</li><li><code>true</code></ul> | Returns a HTTP 413 when the file is bigger than the size limit if true. Otherwise, it will add a <code>truncate = true</code> to the resulting file structure.
