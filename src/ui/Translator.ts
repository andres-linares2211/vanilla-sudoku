const language = window.navigator.language;
getTranslationFile(language).then((file) => translateWithFile(file));

type translationFile = { [key: string]: string };

function translateWithFile(file: translationFile) {
  document.querySelectorAll('[data-translate]').forEach(async (element) => {
    const key = element.getAttribute('data-translate');
    if (!key) return;

    const translation = file[key];
    if (!translation) return;

    element.innerHTML = translation;
  });
}

async function getTranslationFile(language: string): Promise<translationFile> {
  let file = null;

  try {
    file = await import('../../i18n/en.json');
    file = await import(`../../i18n/${language.split('-')[0]}.json`);
  } catch (e) {
    console.warn(`We couldn't file a translation file for ${language}`);
  }

  return file;
}
