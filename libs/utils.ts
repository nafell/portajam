import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css';
//atom-one-dark-reasonable
//github-dark-dimmed
//vs2015
//pariso-dark ubuntu-like

export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
  return format(jstDate, 'd MMMM, yyyy');
};

export const formatRichText = (richText: string) => {
  const $ = cheerio.load(richText);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, '') || '' });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $('pre code').each((_, elm) => {
    const presumably_filename_div = elm.parent.parent;

    // Checks if this code block has a filename attatched.
    // Has filename: topleft radius = 0
    // No filename:  all radius     = --border-radius-code
    if (presumably_filename_div.type == 'tag' && presumably_filename_div.name == 'div') {
      if ('data-filename' in presumably_filename_div.attribs) {
        if (elm.type == 'tag') {
          $(elm).css(
            'border-radius',
            '0 var(--border-radius-code) var(--border-radius-code) var(--border-radius-code)',
          );
        }
      }
    }

    const lang = $(elm).attr('class');
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });
  return $.html();
};
