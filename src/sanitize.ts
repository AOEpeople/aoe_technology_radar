import sanitizeHtml from 'sanitize-html';

const defaultSanitizeOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
  allowedAttributes: {
    'a': ['href', 'target']
  }
}

export const sanitize = (dirty: string, options: sanitizeHtml.IOptions = defaultSanitizeOptions) => ({
  __html: sanitizeHtml(
    dirty,
    options
  )
});
