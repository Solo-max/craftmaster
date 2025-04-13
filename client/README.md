# Front-end

## клонирование репы

```bash
git clone https://github.com/ваш-username/репозиторий.git
```

## Забрать свежие изменения

```bash
git pull origin main
```

## Работа с ветками

### создание

```bash
git branch имя_ветки
```

### переключиться на ветку

```bash
git checkout имя_ветки
```

### проверить текущую ветку

```bash
git branch
```

### список всех веток

```bash
git branch -a
```

### ссравнить изменения

```bash
git diff ветка1..ветка2
```

## Коммиты и пуши

### добавить все файлы в коммит

```bash
git add .
```

### закоммитеть

```bash
git commit -m "Описание изменений"
```

### пушит ветку в GitHub

```bash
git push origin имя_ветки
```
