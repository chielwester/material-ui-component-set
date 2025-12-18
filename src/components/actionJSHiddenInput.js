(() => ({
  name: 'Hidden Input',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      actionVariableId: name,
      value: valueRaw,
      useBrowserLanguage,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';

    const getLanguage = () => {
      const name = 'BBLocale';
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);

      let locale = navigator.language || navigator.userLanguage || 'en';
      if (parts.length === 2) {
        locale = parts.pop().split(';').shift();
      }
      return locale.substring(0, 2).toLowerCase();
    };

    const valueText = useBrowserLanguage ? getLanguage() : useText(valueRaw);
    const [value, setValue] = useState(valueText);

    useEffect(() => {
      B.defineFunction('setValue', (val) => setValue(val));
    }, []);

    useEffect(() => {
      setValue(valueText);
    }, [valueText]);

    if (isDev) {
      return <div className={classes.dev}>Hidden input {value}</div>;
    }

    function Input() {
      return (
        <input
          className={[isDev ? classes.dev : ''].join(' ')}
          defaultValue={value}
          id={name}
          name={name}
          type="hidden"
        />
      );
    }

    return <Input />;
  })(),
  styles: () => () => ({
    root: {
      '& > *': {
        pointerEvents: 'none',
      },
    },
    dev: {
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '2rem',
      width: '100%',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
  }),
}))();
