import { prefab, Icon } from '@betty-blocks/component-sdk';

import { Babylon } from './structures/Babylon';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TitleIcon,
  keywords: [''],
};

export default prefab('Babylon', attributes, undefined, [Babylon({})]);
