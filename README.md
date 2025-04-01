# Kadochi-server

Best Kado recommender ever

```string
⠀⠀⠀⠀⠀⢀⠤⣀⡀⠀⠀⠀⠀⠀⠀⢀⡠⠔⠲⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⢧⡀⠀⠈⠲⡀⠀⠀⠀⡰⠉⠀⣴⠞⠉⢦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡇⠀⠉⠓⢄⠀⠘⡄⠀⢠⠁⢀⠞⠀⠀⣠⠏⠀⠀⠀⠀⠀
⠠⣄⡀⠀⠈⢒⣄⡀⠀⠑⢄⠘⡍⡸⡠⠊⣀⡤⢎⣁⠀⠀⠀⠀⠀⠀
⡦⢌⣆⠀⠉⠉⠉⠉⠑⠒⣠⡬⠟⢻⡶⣚⣒⠠⠶⠈⣉⣁⣒⣠⡤⣄
⠃⠀⠀⠉⠛⠿⠍⣉⠭⠑⠒⠈⠁⠈⠁⠒⠤⢀⠉⢙⣭⠩⠑⠂⠉⡸
⠸⡤⣀⡀⠀⠀⠀⡇⠈⠁⠒⠠⠄⠤⠄⠐⠂⠈⡇⠀⢸⠀⠀⠀⣀⡧
⠀⡇⠀⠈⠙⡀⠀⣇⡀⠀⠀⠀⡀⠀⠀⠀⠀⠀⡇⠀⢸⠔⠒⠉⠁⠁
⠀⢿⠀⠀⠀⡇⠀⡇⠈⠑⠲⠤⣇⠤⠤⠒⠊⠉⠁⠀⢸⠀⠀⠀⢰⠀
⠀⢸⠀⠀⠀⠁⠀⡇⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢸⠀
⠀⢸⠀⠀⠀⢸⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⢸⠀
⠀⣼⠀⠀⠀⢸⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⡇⠀⠀⠀⢸⠀
⠀⠓⠦⠤⣀⣸⠀⢸⠀⠀⠀⠀⠐⠀⠀⠀⠀⢸⠀⠀⠇⣀⣀⠤⠜⠀
⠀⠀⠀⠀⠀⠈⠑⠒⠤⣀⠀⠀⠀⠀⠀⣀⡤⠼⠒⠊⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠶⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

## Requirements

| Requirements | Version |
|--------------|---------|
| Ubuntu       | 22.04   |
| Expo         | 6.3.12  |

## Development

To run it:

```bash
npm install
npm start
```

To run it on native mode

```bash
npx expo run:android 
```

## Deployment

Configure gunicorn (or add it to systemd)

```bash
eas build:configure
eas build --platform android --profile production --clear-cache
```
