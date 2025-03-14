import { autoReplace } from '@utils/string';

export const populateTemplate = (template: HTMLTemplateElement, destination: HTMLElement, replacements: Array<object>) => {
  const str = template?.innerHTML || '';
  const newStr = replacements.map(entry => autoReplace(str, entry));
  destination?.insertAdjacentHTML('beforeend', newStr.join(''));
};
