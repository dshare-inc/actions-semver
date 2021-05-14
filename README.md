# actions-semver
Semantic versioning 도구

```yaml
jobs:
  Run:
    runs-on: ubuntu-latest
    steps:
      - name: Bump Major
        uses: dshare-inc/actions-semver@1.0.2
        with:
          version: ${{ env.VER }}
          method: major
```

```
- name: actions-semver
  uses: dshare-inc/actions-semver@1.0.1
```
