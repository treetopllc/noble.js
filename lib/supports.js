// XHR2
exports.xhr2 = "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest();

// AJAX File Uploads
//exports.xhr2FileUploads = exports.xhr2 && new XMLHttpRequest().upload;
exports.xhr2FileUploads = false;
