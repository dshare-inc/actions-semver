# 🛠 actions-semver
Semantic versioning 를 만들고 반환합니다.

```yaml
jobs:
  Run:
    runs-on: ubuntu-latest
    steps:
      - name: Bump Major
        uses: dshare-inc/actions-semver@1.0.3
        with:
          version: ${{ env.VER }}
          return_with_prefix: true
          return_with_suffix: true 
          method: major
```

```
- name: actions-semver
  uses: dshare-inc/actions-semver@1.0.3
```
ㅊ
