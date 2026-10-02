module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            [
                'babel-preset-expo',
                { jsxImportSource: 'nativewind' } // 👈 ОБОВ'ЯЗКОВО ДЛЯ NATIVEWIND v4
            ],
            'nativewind/babel',
        ],
        plugins: [
            // Переконайтеся, що reanimated стоїть ОСТАННІМ
            'react-native-reanimated/plugin',
        ],
    };
};