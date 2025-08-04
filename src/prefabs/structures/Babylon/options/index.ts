import { variable } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const babylonOptions = {
  content: variable('Content', {
    value: ['Hello world'],
    configuration: { as: 'MULTILINE' },
  }),

  ...advanced('Babylon'),
};
