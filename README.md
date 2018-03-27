# Secret Links

## Setup
```
mkdir secret-links
cd secret-links
export GOPATH=$(pwd)
mkdir src/github.com/thecodingwizard
cd src/github.com/thecodingwizard
git clone REPOSITORY_URL
cd secret-links
go get -u ./server/...
```

## Commands
```
// Deploy
cd web
yarn build
cd ..

gcloud app deploy -v [version number]

// Local testing
dev_appserver.py app.yaml
```

Note: `dev_appserver.py` uses python 2. Use `virtualenvwrapper`	to create a dedicated Python 2 environment for dev_appserver.py if you are running Python 3 on your machine.

## Troubleshooting
`Can't find import: "github.com/valyala/bytebufferpool"`:
https://github.com/valyala/fasttemplate/issues/8

```
rm -r ../../valyala/fasttemplate/vendor
go get github.com/valyala/fasttemplate/vendor
```