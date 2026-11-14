```text
rumbo-mundial/
├── .env.example
├── .gitignore
├── .vercelignore
├── package-lock.json
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── app
│   ├── api
│   │   └── rooms
│   │       ├── [id]
│   │       │   ├── action
│   │       │   │   └── route.ts
│   │       │   ├── join
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sala
│   │   └── [id]
│   │       └── page.tsx
│   └── sitemap.ts
├── components
│   ├── Activity.tsx
│   ├── Board.tsx
│   ├── Dice.tsx
│   ├── EntryForm.tsx
│   ├── Log.tsx
│   ├── PaymentModal.tsx
│   ├── PlayerPanel.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyDialog.tsx
│   ├── Room.tsx
│   ├── TradeModal.tsx
│   └── TravelArt.tsx
├── lib
│   ├── game
│   │   ├── art.ts
│   │   ├── board.ts
│   │   ├── cards.ts
│   │   ├── engine.ts
│   │   ├── money.ts
│   │   ├── rules.ts
│   │   ├── shuffle.ts
│   │   └── types.ts
│   ├── http.ts
│   ├── site.ts
│   └── store.ts
├── tests
│   ├── api-smoke.mjs
│   ├── engine.test.ts
│   ├── helpers.ts
│   ├── regressions.test.ts
│   └── store.test.ts
├── scripts
│   └── entrega.mjs
├── public
│   └── art
│       ├── countries
│       │   ├── alemania.webp
│       │   ├── argentina.webp
│       │   ├── brasil.webp
│       │   ├── canada.webp
│       │   ├── chile.webp
│       │   ├── china.webp
│       │   ├── colombia.webp
│       │   ├── costa-rica.webp
│       │   ├── egipto.webp
│       │   ├── espana.webp
│       │   ├── estados-unidos.webp
│       │   ├── francia.webp
│       │   ├── guatemala.webp
│       │   ├── inglaterra.webp
│       │   ├── italia.webp
│       │   ├── japon.webp
│       │   ├── marruecos.webp
│       │   ├── mexico.webp
│       │   ├── panama.webp
│       │   ├── peru.webp
│       │   ├── rusia.webp
│       │   ├── sudafrica.webp
│       │   ├── suiza.webp
│       │   └── venezuela.webp
│       ├── PROMPTS.md
│       └── world-center.webp
└── README.md
```

## .env.example

````text
# Credenciales privadas: copia este archivo a .env.local y completa los valores.
UPSTASH_REDIS_REST_URL=https://TU_BASE.upstash.io
UPSTASH_REDIS_REST_TOKEN=TU_TOKEN
# Alternativa: KV_REST_API_URL y KV_REST_API_TOKEN.

# URL pública principal, sin rutas de sala. Cambia este valor si cambias de dominio.
SITE_URL=https://rumbo-mundial-khaki.vercel.app
# Opcional: solo el valor content de la etiqueta de verificación de Search Console.
GOOGLE_SITE_VERIFICATION=
````

## .gitignore

````text
node_modules
.next
.env*
!.env.example
*.tsbuildinfo
coverage
.vercel
/public/*
!/public/art/
````

## .vercelignore

````text
# Solo referencias del usuario; la interfaz usa ilustraciones propias en código.
public/tablero/**
public/paises/**
public/correos/**
public/mensajes/**
public/billetes/**
public/casa y hotel/**
reglas_turista_mundial.md
ENTREGA.md
*.zip
````

## package-lock.json

````json
{
  "name": "rumbo-mundial",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "rumbo-mundial",
      "version": "1.0.0",
      "dependencies": {
        "@upstash/redis": "^1.35.3",
        "next": "^15.5.29",
        "react": "^19.1.0",
        "react-dom": "^19.1.0",
        "zod": "^3.25.0"
      },
      "devDependencies": {
        "@eslint/eslintrc": "^3.3.1",
        "@types/node": "^22.15.0",
        "@types/react": "^19.1.0",
        "@types/react-dom": "^19.1.0",
        "autoprefixer": "^10.4.21",
        "eslint": "^9.25.0",
        "eslint-config-next": "^15.5.29",
        "postcss": "^8.5.3",
        "tailwindcss": "^3.4.17",
        "typescript": "^5.8.3",
        "vitest": "^3.2.0"
      },
      "engines": {
        "node": "22.x"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",
      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.28.2.tgz",
      "integrity": "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.28.2.tgz",
      "integrity": "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.28.2.tgz",
      "integrity": "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.28.2.tgz",
      "integrity": "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.28.2.tgz",
      "integrity": "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.28.2.tgz",
      "integrity": "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.28.2.tgz",
      "integrity": "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.28.2.tgz",
      "integrity": "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.28.2.tgz",
      "integrity": "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.28.2.tgz",
      "integrity": "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.28.2.tgz",
      "integrity": "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.28.2.tgz",
      "integrity": "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.28.2.tgz",
      "integrity": "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.28.2.tgz",
      "integrity": "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.28.2.tgz",
      "integrity": "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.28.2.tgz",
      "integrity": "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.2.tgz",
      "integrity": "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.28.2.tgz",
      "integrity": "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.28.2.tgz",
      "integrity": "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.28.2.tgz",
      "integrity": "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.28.2.tgz",
      "integrity": "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.28.2.tgz",
      "integrity": "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.28.2.tgz",
      "integrity": "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.28.2.tgz",
      "integrity": "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.10.1.tgz",
      "integrity": "sha512-cuadcxVFE8sDK6iWJbs8Sn0av2Nrh2QSGQhVlBW9AaAHqHwjWsZHT8LJ4hFGPh7ASBV2deFdM7H/DPjulmh8rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.7.tgz",
      "integrity": "sha512-F42g89Qd5oAWtp0k0nnSrjziAKza7w8SVT4mStc18LZMaRb4J1HQAHLCalEtDCxrTuksx7NU9qsmeLwpOfPqWw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.3.2",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.5",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.5.tgz",
      "integrity": "sha512-QywQuszQh77pIXCsq998c8hbhSTI/azTty1Z6N53dmAudKHhy573j3yvRLsX2BSp8YpLtoCEG8E9DJe+8zUh4A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.5.tgz",
      "integrity": "sha512-QRUlFQ0WxvdWyqqG/WtI3iupfD5rBzmCHXSdPsY91sAtVtTo7Q4cb6zOccZ3gqEqkr0f1As1ehLqmEpDsRf+lg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.5.tgz",
      "integrity": "sha512-+BR255RhDlpygUpOc/Jdt1nT6DQ3XG/ERo5wbcdOf5Q320dKtPCKPLR1LJs9VGXRaMa8l1uUa0tkCNOXiAxZUw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-freebsd-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.5.tgz",
      "integrity": "sha512-Y/z91nEZ4uIBX5X3nfTovjU9lHNKFYbL2lpHCLVNmXQK03VIZvXBBt0KxbPGp2SdGSF+2mQU4e+hQaWOt86iAw==",
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.4.tgz",
      "integrity": "sha512-5R89nBYiRdUlSWJxPhO+GVtaXzXSxKnRu/xqMn3KTA3L9EB9Oy/P+Nn2f2vlhPuUdy/Zusb2DarbyTpGCfEDuw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.4.tgz",
      "integrity": "sha512-iR2OKH80yi0U+dUplyh3/xdpFvps6YkCwsXenIJxqxR1v9o+xtKTGbS9H7cps+2Vxjc8B1j96p75NmTGjIhtpQ==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.4.tgz",
      "integrity": "sha512-LmRtTsOHuvM2+wlO2Db37dx5MiZhB0FvSunciw48YjdOkZz9KAiRbm8ujeMOA1INqmei5NapFxYEK1D1ZSidmw==",
      "cpu": [
        "arm"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.4.tgz",
      "integrity": "sha512-Y3dgX/6lE2QhQb+Gxy0WZxfg9MEm/JBjamZpS2IklP7xIQoKN4hzAm7KcMVGtaVDt3neE9OKBC7vAfonA/Lr1A==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.4.tgz",
      "integrity": "sha512-Le6boB8Tai0Nis+gIxIpKx68UDVVIqdR8Tin5Yf1z2LJJQLDJvCDRqRu+jC2qCoD+eIomonmOwB4smBRxfVpYQ==",
      "cpu": [
        "ppc64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.4.tgz",
      "integrity": "sha512-aHkkIEHPRdQEegJN20MLmGtxYD9R2wQr3Cwpddnu5+YKMt6Uzax7S9h5gpZTo8wyrGuZSlfQ63OevL5mTyOC7Q==",
      "cpu": [
        "riscv64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.4.tgz",
      "integrity": "sha512-ra/mB6MikESDUO7Yg+Mi95bFBb9GsObURuhnOv3OqknjGe9sZrG8tCe9q0xSIGrtLgvgw0gKnFWcK4blSgQOuQ==",
      "cpu": [
        "s390x"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.4.tgz",
      "integrity": "sha512-GJ//SSXbnwSDes02umB3nDJLFcQzw8a18V8fyhqr6tV515tOEMdImjjxj1AoafMRz56F3PHgftnj1QEKSU1zkw==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.4.tgz",
      "integrity": "sha512-hvulFwtjUcagsis6BBxHwGFwWoNZjgYmULGVrZcyfNbjA8hKILbRxGg15/7w5HDyXHXUos/j6baAWqnCyQ2DWA==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.4.tgz",
      "integrity": "sha512-6zXKeE/p39I1AmA3cJG35eyBGNqNddLnUXjhwBnsGjFPWqf5VKkDBEqaEkPDoTEtkxwi2vv8Tcr2mDyP4So7Fg==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.5.tgz",
      "integrity": "sha512-LEaXK2WdXVK5ykcw0buWyPMsmLLL2vpHLD6yrNSW+JGEL3BZPA4tpKN6iaMc4AxTTAoaX/sU1rOL51lcIz48ZQ==",
      "cpu": [
        "arm"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.5.tgz",
      "integrity": "sha512-LYVx5JTsOM2CBzmxreh+nl64/3H6Xb09iSLknqH47z2T2DFFxDeFLP5y4dJwe6H7uGQlHPyEEtIqyo3DYsRwdQ==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.5.tgz",
      "integrity": "sha512-QVxAAq8evVRI9ia2vqgwrmWucn5Dfv+JdWzj75pD8omHLPSP7f8p20O8jxzjCcuCEQEOtYOZUmX1hkiZ0kdevA==",
      "cpu": [
        "ppc64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.5.tgz",
      "integrity": "sha512-LtdreXguaavKODPIfzJ4kffx7UNt1omwtK0rch4EBbbSTXPnxWmYSayXdLJw0fJzQ97kHt1gL/yh4tvU+nCyRQ==",
      "cpu": [
        "riscv64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.5.tgz",
      "integrity": "sha512-UZasTOFiYzotTsGOCu42BfUzP6Tu6Do/947iRm1RsLKvlllxwGcn4RN27LibGWceix4Y+Pmw3jsnTcCQIgWjqA==",
      "cpu": [
        "s390x"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.5.tgz",
      "integrity": "sha512-SxFtLTeJInhAA9Q836kux2vZNeOBQEx658qvbboZScr0wIARym3IcGmW7KpVD5sbVg0Ojy+udFQdayYIZyoNog==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.5.tgz",
      "integrity": "sha512-9HbMclmI1zlNkFRs3z9/eBtDjfD0sGlrX1z6b1qwmiFY5ElDLh4BC0LPBdVp7z1DXFiKlIcznf+ZlsuZzLxQqg==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.5.tgz",
      "integrity": "sha512-4KOphqB035HrVdqLZfCgMzzERrQkkzOwRhl4OAkRO1YCldbaFjySXMaK534Mo0V+LndnlJk+sbUyLeU0ULyD1A==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.5.tgz",
      "integrity": "sha512-Ptsga1su4tQx+LLF1ECS9U6nz5kmrXKo6XVbtR48Ke3ZRxxgaWBu7IDtEe1quo8hiupwm6WFqxVlXaSf7IINGQ==",
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.11.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-webcontainers-wasm32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.5.tgz",
      "integrity": "sha512-hfhF/FmoQyTUkA0bIKFOtw536BQSeBMe6BF6QyWlrPxT754+TFLaZ7sKKTfvvM0yJgKgaYTwnFCIZ/GuDw5SUA==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/sharp-wasm32": "0.35.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.5.tgz",
      "integrity": "sha512-X4t7g+7ZA5DKblCBEXGjUqqemj4vczING/5viFwAL8h4N3qYeyjwdCvRLHi4EdOUI+2Z7UFlp1VM+p/AuEtm6Q==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.5.tgz",
      "integrity": "sha512-5Zm82LoBc43nhwNybZlG7Y1KO//Zhsn306fQl29ZOuStHLGTo3BWL83q3cznX0poxSAMuYL1On/BHBxkBeKr6A==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.5.tgz",
      "integrity": "sha512-x76eH0vEiHlcMQu8Y8IenntaACtddpT6W0wmXtWrnKcnKI7ME5DdgqhAD6SEWOEl1v2zDvkZDhFA9KnURwpfqg==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@next/env": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-15.5.29.tgz",
      "integrity": "sha512-9SrTiTsgORa+KfhlXXAGC1eSs847E+d2MQTPUX+n7R5XA8g/B6ZitfL6GoYHNMLwG3Hzs1wjDH0/ME5WrGMqBQ==",
      "license": "MIT"
    },
    "node_modules/@next/eslint-plugin-next": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-15.5.29.tgz",
      "integrity": "sha512-d3dH0WVbXr+W/3f/TMU6fl7vHJBuok7ugMCDPfRnHhCLl8ppAtFbfXgVHpnLrUirHN4vE5GkTMnId3Fmxv9UCQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-glob": "3.3.1"
      }
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-15.5.29.tgz",
      "integrity": "sha512-vozRDuM23T0faRR0O3oN1eRqjEqUue4Eljhkb9f7urQgzmyzve7j3atzTv3Z1AnjQ9IeVY0X3aS1/an56TOiTg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-15.5.29.tgz",
      "integrity": "sha512-FzrcEzMZVcp/SqFXCW5SXyPil10bB9l5wpTBapEs9ZMqke3W+hyC5mNAdAa1divn+4SZ7LD5BtK67XvK7SucWQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-15.5.29.tgz",
      "integrity": "sha512-FWbWE5P313Yy5062vgY9UspNz/t6Ve/s35X9v6YU7ilsbhqKGabPBPIWcMEPhyomeRdwfv19NAITkU2FFIhGwA==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-15.5.29.tgz",
      "integrity": "sha512-xjTHrVisb9GeDSNFOwJI+4UJrKdwlpjz95q8sEvQh46yUp3+JikNcf26pode/HlHktSdJwcHx3iVMCjfPcnU+A==",
      "cpu": [
        "arm64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-15.5.29.tgz",
      "integrity": "sha512-5WqW7kHscT02wyF8TlbYv9+zx3KhnQeZwk+FkTCr1r7TuvMrqqOZ3RDkdDKl3O0M0Er3VuQEzoEIrj8VX5fjaw==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-15.5.29.tgz",
      "integrity": "sha512-I0QJ1Be9vtdq5FABhNcSbkELllA91WnhG+m4BjJHCn1bXAIL8AuDABIKIJ7Bz84T/sIkZP6TvOEWJcKckrX3yQ==",
      "cpu": [
        "x64"
      ],
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-15.5.29.tgz",
      "integrity": "sha512-q4fQFWtR7nH7ZDhU8RIvwNW0S/nHImaZkoOSw7rOXFgoP51HTesm8/8P/w3ACjc9GxqytXj0LZZesykK3arFBw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-15.5.29.tgz",
      "integrity": "sha512-putWQ+CTEJunAPIPDPfb06Kc4emhYpdM5FoCDHSkC/ym7Dy2xOBMPgBjBbRkw2Hp5/550ACYxCmUtV4k4ui3Iw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nolyfill/is-core-module": {
      "version": "1.0.39",
      "resolved": "https://registry.npmjs.org/@nolyfill/is-core-module/-/is-core-module-1.0.39.tgz",
      "integrity": "sha512-nn5ozdjYQpUCZlWGuxcJY/KpxkWQs4DcbMCmKojjyrYDEAGy4Ce19NN4v5MduafTwJlbKc99UA8YhSVqq9yPZA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.67.5.tgz",
      "integrity": "sha512-FdWPeulkH+FH+rBzyKBD59tuVN4tRKvmVilSJm0OcnoYsQTpd9UhD78OaPcsYqo2fX6hCwAG0YIjrDLoQ3pR3g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.67.5.tgz",
      "integrity": "sha512-bmkDuBGnF+Ji8atWlXcNjxIC52ShCbdXPbW7Nz0lRoCFi1lrvsO0XobJY36kTj7duc1vOmGJeQ9vtVuGjnzihA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-x64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-x64/-/rollup-android-x64-4.67.5.tgz",
      "integrity": "sha512-6KvVfnqPTqmbQ5YobMl9HYiSymAsCt8HlNeriDshwJQcveXwT+vIMW6wGL1RcJbXH9+r3BAJvjab5+rIgtSEqA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.67.5.tgz",
      "integrity": "sha512-SNamgdrY69oPdBrQV9fKGo6PSmKcVhyn0D0jnDmcqgRJvrxQGGBhtekOHTUJ7TCgkW0nE8XMH9v2CwXmjNIzVA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.67.5.tgz",
      "integrity": "sha512-HNdl34thiJtHDSglogjmAlQ296L8cc8zA7ODH65nnmY7E+jPP55WEbh8J5583rWFLMjxyYywxZuwPOwRvEi5tA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.67.5.tgz",
      "integrity": "sha512-WvZYtANNswfHzSNHaJAoG6Ipfc4SyZIDYuIjFdHv07xXxhHl+Xx8o+bNDWsxpOADFT2mKXcXVrfOG4OlWTLo8Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.67.5.tgz",
      "integrity": "sha512-EUU+Wgf9NyHekceC+DxAdm42f6bq2ezH/7DEb/JnCb8SAUhG2xph5BiVukxplWal2m5pP8CzJZE+FLwRopywjQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.67.5.tgz",
      "integrity": "sha512-dgU1CvUuE2IkaJBAeuAbxpDdMHAdZBT5oth5u22DtuoMg4gXXYr2+Sm30RigPJG1F2VEoiGJUziGLuIh9+jPxA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.67.5.tgz",
      "integrity": "sha512-rdgJcJig2VngYlcTCRQw2BA8kLWM6QwDFe9uLFo81lya0jPC1r8wZu92sAvTUIv48GWlkRVi6/fpsa5CoFSKoQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.67.5.tgz",
      "integrity": "sha512-+jtCiQnrEFHWAUAcUpP7wppb1p6HKOgBP3mXx75cEYpDF2Y5MEqBky2HNz+osFuVx5uX44gnMTmbe5RJauzn6A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.67.5.tgz",
      "integrity": "sha512-heflX7ENhL8eHmLcUxDEHCSK8CKLyPprysb2JGoSTh5Ip7nHrzIRc+2USyxul3nxi98H8pGxJIEDEpURlS1X5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.67.5.tgz",
      "integrity": "sha512-rRtNU0zBfRHkJ8pscHN9qRtUYLq8Rao4EX7aVWvKcFmJUANkCCXFRU7ovNBEMhpEONyUEB/3DRVDXwDDguSfHA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.67.5.tgz",
      "integrity": "sha512-/6auyi9yj8MD/Q+8P+f2ay57jQ7a0j7Yp1JK86pecH6ZnRViQZ5GOjoRSjGArFeTSHFznRbM2QPQcBgDPyNMfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.67.5.tgz",
      "integrity": "sha512-Hsc0vlt+vPvqzUkHKffWKf3YE/yexrY+yeFf7IsUvDC6PV7YGCsA/gJvPa+WJdgxGJnwuoO1HmLkbahaLKabYQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.67.5.tgz",
      "integrity": "sha512-Jx5TMMSPJwHY7F/JwPdS6nuBwny2ECRK+EsAJV5HZrfiddeSS6ZrohkLkFZm3rjqBUuQ4FPX5gGMtakUuQO6fQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.67.5.tgz",
      "integrity": "sha512-fGWcq2lo/XCqAkBLOokg66D/z+MUouryB8i+QdU9RR6O5knG7rucc0WFPqWYL1Wk/wuiJouDfmyBxmZKRM9bag==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.67.5.tgz",
      "integrity": "sha512-JwO/Ys3jybc0UW3V5XO2CMnp0RhvoczDDQTgAEE1IctT+HRY3W5parIIWLUpmAK4gHSeeYJofm2iQPFA62K6ag==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.67.5.tgz",
      "integrity": "sha512-vVD4iqel6J6A1xAJlb4mxEO9i1wOJ4/SkcKoDKAuK/wqEBPOA7/P5dDyZvNx46ocHwOUwzo3WjhTdKqET9kEAg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.67.5.tgz",
      "integrity": "sha512-HmEfNh5Cdd/NHxgqwMzKnjlvicQQA+D+w+vQXDJSV0x/aHiQSjVwh1Th5RoA7QsMieIaxibt/5iJq68BraTSUg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.67.5.tgz",
      "integrity": "sha512-NfmALpbe009nYzZ2QqlSW6nzbGddXpqk3nwualrIr+4QflQCTGMzt3QKK20yARiAnSV9fJdM5WNwIYUf31x3uA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.67.5.tgz",
      "integrity": "sha512-ngcE7Udpy/iJ3lexVhYcbpUV2OJIakRGus3snc6K52BnAAJetDBG1Ku5Eh3CECtnW3mpBYWg5VCD4tTaOXKOVQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.67.5.tgz",
      "integrity": "sha512-DZ01A2EdTYX8xVeGoGiWkJBRWDh+/BOflwGPVsBay43PDxcq8ez0xuovZnPnk1xjE3CdI0pdZXxsJp/Xjmf7uQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.67.5.tgz",
      "integrity": "sha512-nJKiMKDO140DUCEcQZl+f4HiGPMBxrW2webjuWJ2E3qPeoruHf2zByml4TP52lA1zDi6L4I92D/5stxeA/6pig==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.67.5.tgz",
      "integrity": "sha512-ykLkBCf+Kls24QmqM3IRf1T4sGMh0rXPyymtj+hXlWKPJnXbXraHqUUsKtOIxqLasjT1i7DhfQGAaZYeiHbSOw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.67.5.tgz",
      "integrity": "sha512-NiFPUFw8cHhkmBlL1k1eaz+5AXXm89rztj+DQdDuQ7VGPM0+ADFhezQ2KcBMF50UEFzGUr0+DVjVND743XwKWQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.67.5.tgz",
      "integrity": "sha512-Khj/vrKCpdbiAWYbJAeSy4D5iep+qwW/86lNoKvdleJYGxgbRE7h87+5d5T9D7gt8NcqhNFpreRgIg8T4bLzKQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rtsao/scc": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@rtsao/scc/-/scc-1.1.0.tgz",
      "integrity": "sha512-zt6OdqaDoOnJ1ZYsCYGt9YmWzDXl4vQdKTyJev62gFhRGKdx7mcT54V9KIjg+d2wi9EXsPvAPKe7i7WjfVWB8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rushstack/eslint-patch": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/@rushstack/eslint-patch/-/eslint-patch-1.16.1.tgz",
      "integrity": "sha512-TvZbIpeKqGQQ7X0zSCvPH9riMSFQFSggnfBjFZ1mEoILW+UuXCKwOoPcgjMwiUtRqFZ8jWhPJc4um14vC6I4ag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.15",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz",
      "integrity": "sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@types/chai": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/@types/chai/-/chai-5.2.3.tgz",
      "integrity": "sha512-Mw558oeA9fFbv65/y4mHtXDs9bPnFMZAL/jxdPFUpOHHIXX91mcgEHbS5Lahr+pwZFR8A7GQleRWeI6cGFC2UA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/deep-eql": "*",
        "assertion-error": "^2.0.1"
      }
    },
    "node_modules/@types/deep-eql": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/deep-eql/-/deep-eql-4.0.2.tgz",
      "integrity": "sha512-c9h9dVVMigMPc4bwTvC5dxqtqJZwQPePsWjPlpSOnojbor6pGqdk541lfA7AqFQr5pB1BRdq0juY9db81BwyFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.10.tgz",
      "integrity": "sha512-lTyOMnOcmRBzdCv6/4zUZCrEhV0xrqQiUZBZtVcbmLHBXKLnN8q89v/wKRF/Q0HbwVsqbIG3o5HDoFl9sduM+g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "22.20.5",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.20.5.tgz",
      "integrity": "sha512-U2+DNr+wSjpsTS/wZGYHq7GcwfuSmKiKvoPvK22zwTlRhU91yOniN4qRR5KhIjvif7ysw/dz/hKmfDH0Ris4aA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",
      "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.3.0.tgz",
      "integrity": "sha512-ZI7bU42mZXXKHn/qNLEw2IrbiINU7X5+vfgdixBHkCNpYWXjKgfQ/P+uyGb5CjOLB9UcnTeg3rylQtV2hym44Q==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.3.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.72.1.tgz",
      "integrity": "sha512-5CokTWXpmbylfFabsbvHC0CAw3XLaGnoa+nFJX5FR592h/LoZsENUE6p/rg5xvkKrFEXz6pYmgI29AgXc2N3BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.72.1",
        "@typescript-eslint/type-utils": "8.72.1",
        "@typescript-eslint/utils": "8.72.1",
        "@typescript-eslint/visitor-keys": "8.72.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.72.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.14",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.14.tgz",
      "integrity": "sha512-wCBiZ77u1tuWde6G/nfOtLaCTYcFDU5yCzARzK10y+rLhzYoL7a7yEemcopcc2Mzow7gZOIjnV2ym1NYmdiJOQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.72.1.tgz",
      "integrity": "sha512-ZGwZP4OCfyA0AQTpEAMWz+rtX01DRhQWW5hB0ucKDEIX5U7jdmPSaMx94rQfaPAQzIYz2BimOgKOJtjfpRFQ9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.72.1",
        "@typescript-eslint/types": "8.72.1",
        "@typescript-eslint/typescript-estree": "8.72.1",
        "@typescript-eslint/visitor-keys": "8.72.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.72.1.tgz",
      "integrity": "sha512-fAuVMkwdO/huI8nyo/WKnNKf6Gag93S56Rh3Ts5mGcavwSdaN8tRg1gCeIGX8PF+nzp1BjGfO4gHhGzW1J6jTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.72.1",
        "@typescript-eslint/types": "^8.72.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.72.1.tgz",
      "integrity": "sha512-lC/t6eMCZZQAAKZEYGL6RDVSuFehpdmMT6h+nJIjIa6oylN/PwDgDVtEIbB7O9xFfZYtZAYLoLlDNWKJhtF+uQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.72.1",
        "@typescript-eslint/visitor-keys": "8.72.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.72.1.tgz",
      "integrity": "sha512-e4D5R5vpeAEPBxT2BAzsFQL3sbwyeeeo5+aczgNSRK1V734jE7pTqaGFU+fXapWEQwnZbpFaTn32+Z8DwS6OTg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.72.1.tgz",
      "integrity": "sha512-iY2wlmyrXJmx4yxUGP3aYCFF3cA/6ShddOKmLU2dx7LnEykbAM8WThlxZEfd1NddqceF6eJmZUayxx9oKIYNlg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.72.1",
        "@typescript-eslint/typescript-estree": "8.72.1",
        "@typescript-eslint/utils": "8.72.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.72.1.tgz",
      "integrity": "sha512-LmE5IhQet1BWOWEXqBrVtBPsMAOQ6Nzk35d+WLh3mk4EUF33sqlfxjio1MdYeSvKSG5skactKKuixBIKXhL4Rw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.72.1.tgz",
      "integrity": "sha512-DAlUoUV93hIvrtIQLwCbmZQYVZwOMhiHJrOVUUIWicFZaIYjTRqlY3I/NZevfkLmSqkNHRu2qYDcq9lrn16oOQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.72.1",
        "@typescript-eslint/tsconfig-utils": "8.72.1",
        "@typescript-eslint/types": "8.72.1",
        "@typescript-eslint/visitor-keys": "8.72.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.12.tgz",
      "integrity": "sha512-YovQ3rzhaLMIrDjNDMkNS01tea93qhEhG5xy8f6+R0l+dw3Ki+5sCoIoI942iuLZTHWogWktgwVDhU09iNEimQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",
      "integrity": "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.8"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.72.1.tgz",
      "integrity": "sha512-5v5liypurJBFHCBNqh/RjsymAD+VWcE0djuGY/BUqp5fC3Qn+luWDEksjuTtWjPn6i5zQlUtkZCRG/CYG0yCkA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.72.1",
        "@typescript-eslint/types": "8.72.1",
        "@typescript-eslint/typescript-estree": "8.72.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.72.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.72.1.tgz",
      "integrity": "sha512-SB8xqipSzZHUePCCLNeYxqnxq83X61/qzNhjQGbTfjxGZIeOEP7tBgWYX05Tcd6CgE02WdTJnh5b8kMZJ/+bnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.72.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@unrs/resolver-binding-android-arm-eabi": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.13.0.tgz",
      "integrity": "sha512-60E5mvmIiW+i1E/HYeSX4iE4A8s9NJSGYPu7UM0DJght1c2tTkWwuyDyAwzsEXhKM/XbbndfnTiXdfrf27d2hw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-android-arm64": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.13.0.tgz",
      "integrity": "sha512-qlh/JR3Tuy1cJ7xtf5pR4ykvLiK6os7X7EL2+zXZbrVc/s+yB8DoFdQrCAW9/a2TOxPVbR7QVNpkPWh7UWIsEQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-arm64": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.13.0.tgz",
      "integrity": "sha512-yynnnnJXUC99WeD1GfvuXPKsKNfvgzGYC2eRayFnUfsHVROjqrbFOkFQLZiSx1H8+PLy5BzU8vqyPyLqbRfeBQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-x64": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.13.0.tgz",
      "integrity": "sha512-t8PXE0Ip9tmGyhRlfVsnEbzGM5iSvJIeNIXciUACjzpg0mmPs13fGv2x7W8sBa0S8zbIiohxKXS9fL/LXW/ERQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-freebsd-x64": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.13.0.tgz",
      "integrity": "sha512-qdtl9GDWDoDx6rhzF4RU5SJutV3lcLOiTiyqD6nBxYfEO6lAgLNukfrA+HJ2u2OiyWvV8JW5iEWD3LoONw7lYA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-gnueabihf": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.13.0.tgz",
      "integrity": "sha512-VrMUVwdrScTarsh4B6aUhTtziUavSlglo4Hi8XZ6CpAe4+j3nquY+XoP+tYkiSBDsXZ8386ne4pv4YYYBNi02w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-musleabihf": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.13.0.tgz",
      "integrity": "sha512-zSbTVwaxiTC+zYJ9xVNTC6c+BYO/kOV/odcTI3bHuFFXa+XmjLoUkb/8UxsZeU5YF4K000m17wrXoTblNWuzOg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.13.0.tgz",
      "integrity": "sha512-Z/Rax87moZHsuvJ8awdfP+zrMlsCt3d7mggUPIiPe32KpeagimyzJWnZSMQoV67an9uVQghyh92Pc0VprITnYA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-musl": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.13.0.tgz",
      "integrity": "sha512-oUzXz8hNvFLNEAag8lBKJe1euiV2dmGHAR+eQ5fNpsZO0F1K7IMRb4J6pqYsd7uLMRQNPiu5A1WKUJHbFLWbbw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-gnu/-/resolver-binding-linux-loong64-gnu-1.13.0.tgz",
      "integrity": "sha512-BxhGYvZBg0YrvNOeSEGR3eNklwXYy0mUJk7oeGJvZoQMKM68zYvbbf52+fQI3Le4X0fW276FTKIoTwjpMob80A==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-musl": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-musl/-/resolver-binding-linux-loong64-musl-1.13.0.tgz",
      "integrity": "sha512-nZcIuup9Ar3gAlqoZfX/KW6x83TMI11tLpCjldZG5M1KeY8qNUPNJJ71+sPvG8HMBpoh+ix1pAm5gkMFvcSAcQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-ppc64-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.13.0.tgz",
      "integrity": "sha512-AG6AgdDrkRNjAPwD/cftFJGgZUWCiJX+E8vpYCDEnwFHLTHZ7ppBiU6/vyPPwrfjcPUPQCDbbxE/eZUXsx49jQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.13.0.tgz",
      "integrity": "sha512-6vOqYGcAmzpRWpUURWutzvpf1qJ6eOu5cfYObdtPJnzZ0+Kw4cw+ZkZJqIYEh8fPuTBwSYDL/FwlUhma1G/JVQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-musl": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.13.0.tgz",
      "integrity": "sha512-4HeIn0S2KVUowK0A+EweXrDvZ8CKHEfTtif0kx9vt3ORNsqcXNFFIFnHE0tizma3/Gt5OGrU2ovYNuj+D/bN4g==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-s390x-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.13.0.tgz",
      "integrity": "sha512-JfkvqY7NZbxyhexLE+g6Z8Hsx4utHOGaVazAVghPiBn8Upw2iERZPpKYnW1FBVU4WStv/BiIsoK/Muke0E7asA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-gnu": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.13.0.tgz",
      "integrity": "sha512-iwjLeVdZo/8v5OKAeRIC+4VQV045t1EPZr5B/AVLgUQ04IdtNthWzg6not2cNjZgH2gHpSf4fOXMmN83aLO1FA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-musl": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.13.0.tgz",
      "integrity": "sha512-TOh1fqOjyq1OPoht3BDLd7Y+HeMJRwd5g2VNmCQclknEbjp4py5GFRmT4L/rOybF5Af8q0LT9zHs2WGkwlqtrw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-openharmony-arm64": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-openharmony-arm64/-/resolver-binding-openharmony-arm64-1.13.0.tgz",
      "integrity": "sha512-3T2MNtF2dd1yjaXCVqrsi+/3VZeksEzU1hygPzqqkBLVVjn+2iJzXEkxxCKIVFrWnpmEbazeHJp/ruYD0RUVWA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-arm64-msvc": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.13.0.tgz",
      "integrity": "sha512-hKWfSLiN3L4cIxg0jrpyP/66AXLTcyD37jmSn//rGdOUYGlizYxTEFdJ+GZbp2NnaML3YS/A73nCysze8FaJdg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-ia32-msvc": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.13.0.tgz",
      "integrity": "sha512-N4gDKkDoiyIQEcn3vTqe2ksRxUAtBvQ8c5TiT+WonSa6FHgCAY5+RggnZ134hXJoRj57JEjv4/m+i/pAKHWrTQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-x64-msvc": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.13.0.tgz",
      "integrity": "sha512-DpLMlAqlrk4zBVK3DiDjwKD0oq7pZNy+8BiIBRuByqb6dm5jsdoLMhIiyh/xR7+WejaW/1Ui+XgbgMNa4+zWJg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@upstash/redis": {
      "version": "1.41.0",
      "resolved": "https://registry.npmjs.org/@upstash/redis/-/redis-1.41.0.tgz",
      "integrity": "sha512-TIu9C1B0ToXQLXt2M1LQuGZ6nkMjOZPIdJyU0GGWKZToa/MvJF8x2IRDOPMIAw2BLGXGhi1aZr5AnhlXu4YLXg==",
      "license": "MIT",
      "dependencies": {
        "uncrypto": "^0.1.3"
      }
    },
    "node_modules/@vitest/expect": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/expect/-/expect-3.2.7.tgz",
      "integrity": "sha512-E8eBXaKibuvH2pSZErOjdVb5vF4PbKYcrnluBTYxEk1l/VhhwZg1kZQsdtjq+CsF5CFydf2Rdkz7jDHKSisi3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/chai": "^5.2.2",
        "@vitest/spy": "3.2.7",
        "@vitest/utils": "3.2.7",
        "chai": "^5.2.0",
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/mocker": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/mocker/-/mocker-3.2.7.tgz",
      "integrity": "sha512-Trr0hYO9CM3Wj6ksWHRhK9IZpIY6wTMO5u/MqXurMxT57sWBaOPEtP3Oq60ihZuh5JsiagKfz95OcxdEP6dBrA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/spy": "3.2.7",
        "estree-walker": "^3.0.3",
        "magic-string": "^0.30.17"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      },
      "peerDependencies": {
        "msw": "^2.4.9",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
      },
      "peerDependenciesMeta": {
        "msw": {
          "optional": true
        },
        "vite": {
          "optional": true
        }
      }
    },
    "node_modules/@vitest/pretty-format": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/pretty-format/-/pretty-format-3.2.7.tgz",
      "integrity": "sha512-KUHlwqVu0sRlhCdyPdQ/wBoTfRahjUky1MubOmYw9fWfIZy1gNoHpuaaQBPAaMaVYdQYHJLurzj8ECCj5OwTqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/runner": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/runner/-/runner-3.2.7.tgz",
      "integrity": "sha512-sB9y4ovltoQP+WaUPwmSxO9WIg9Ig694Di5PalVPsYHklAdE027mehpWF2SQSVq+k6sFgaivbTjTJwZLSHbedA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/utils": "3.2.7",
        "pathe": "^2.0.3",
        "strip-literal": "^3.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/snapshot": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/snapshot/-/snapshot-3.2.7.tgz",
      "integrity": "sha512-7C+MwShwtBSI5Buwoyg3s/iY1eHL9PKAf+O1wVh/TdnjXUtkoL/9YQtre90i4MtNXM6edP1wJ2zOBpfCyhIS7g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/pretty-format": "3.2.7",
        "magic-string": "^0.30.17",
        "pathe": "^2.0.3"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/spy": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/spy/-/spy-3.2.7.tgz",
      "integrity": "sha512-Q2eQGI6d2L/hBtZ0qNuKcAGid68XK6cv1xsoaIma6PaJhHPoqcEJhYpXZ/5myCMqkNgtP6UKuBhbc0nHKnrkuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tinyspy": "^4.0.3"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/utils": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/utils/-/utils-3.2.7.tgz",
      "integrity": "sha512-x6BDOd7dyo3PFLY3I9/HJ25X/6OurhGXk2/B9gOZNPF7XDVjeBK4k01lQE5uvDpbuheErh91qYuE1E2OEjK3Rw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/pretty-format": "3.2.7",
        "loupe": "^3.1.4",
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/acorn": {
      "version": "8.19.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.19.0.tgz",
      "integrity": "sha512-oJlA3XiRm7Cyk6qFD2Jn8ak9B7jSy0qy00ADO3+8dpT0LSjFihQYv4C02LFCSYJV3Q37xYwwRy5m+IpIiUzqWw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-buffer-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.2.tgz",
      "integrity": "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "is-array-buffer": "^3.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-includes": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.2.0.tgz",
      "integrity": "sha512-VXY5eFRarnXcYxwBjJzPmEhH55+rmP79/+ueDhi0F+TuqfHCItagIHqxeUZrmgrOPa31QTh9H85DjX3FfJ0FTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "es-shim-unscopables": "^1.1.0",
        "is-string": "^1.1.1",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlast": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/array.prototype.findlast/-/array.prototype.findlast-1.2.5.tgz",
      "integrity": "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlastindex": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/array.prototype.findlastindex/-/array.prototype.findlastindex-1.2.6.tgz",
      "integrity": "sha512-F/TKATkzseUExPlfvmwQKGITM3DGTK+vkAsCZoDc5daVygbJBnjEUCbgkAvVFsgfXfX4YIqZ/27G3k3tdXrTxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-shim-unscopables": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flat": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.3.3.tgz",
      "integrity": "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flatmap": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flatmap/-/array.prototype.flatmap-1.3.3.tgz",
      "integrity": "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.tosorted": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/array.prototype.tosorted/-/array.prototype.tosorted-1.1.4.tgz",
      "integrity": "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3",
        "es-errors": "^1.3.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/arraybuffer.prototype.slice": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/arraybuffer.prototype.slice/-/arraybuffer.prototype.slice-1.0.4.tgz",
      "integrity": "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.1",
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "is-array-buffer": "^3.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/assertion-error": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz",
      "integrity": "sha512-Izi8RQcffqCeNVgFigKli1ssklIbpHnCYc6AknXGYoB6grJqyeby7jv12JUQgmTAnIDnbck1uxksT4dzN3PWBA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/ast-types-flow": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.8.tgz",
      "integrity": "sha512-OH/2E5Fg20h2aPrbe+QL8JZQFko0YZaF+j4mnQ7BGhfavO7OpSLa8a0y9sBwomHdSbkhTS8TQNayBfnW5DwbvQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-function/-/async-function-1.0.0.tgz",
      "integrity": "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.6.2",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.6.2.tgz",
      "integrity": "sha512-VOw9/yGTGwPPgzFcODtcv6zhEPIeIWkRSe10L2ri2f5vZ7ID7lCt6jZzRF5/ubgOZ+szYydmEF5AYsA5jxX1tA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.9",
        "caniuse-lite": "^1.0.30001810",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/available-typed-arrays": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.7.tgz",
      "integrity": "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "possible-typed-array-names": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/axe-core": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.14.0.tgz",
      "integrity": "sha512-9WTZxEjsZ7b13TH8JPmbV2z8CHbl80/2hm3XPEG4JgNdQLK81IBRXmSxHfMAOkSqQeRxT/0dwNDz2GOm3zzpcQ==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.35",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.35.tgz",
      "integrity": "sha512-GNk8KX52CHqeNKGk8+7tZnQab/2k1t/BgrUHPKNdijzpEhF1saPQZHVKb6m5loSAxB39gyrTYw34Qf9CQ3u1qQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.21.tgz",
      "integrity": "sha512-9zeA+KLZNNzglF2TPKRQEDyx6Yby7daAkuy8MiPzpXPsYDWi/DRM8jmwUDxokQjYqBpv5DgPiwD4h4ZZSy1Ujw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.29.5",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.5.tgz",
      "integrity": "sha512-khTmKu5NGYTotqcYo8Bew2k4RAE9PuXRSFRXG2lQBrCEQHyeQ/vX6gKMxfokwywBsLiXZMnHsmWMG1pnO8J7uQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.33",
        "caniuse-lite": "^1.0.30001819",
        "electron-to-chromium": "^1.5.464",
        "node-releases": "^2.0.60",
        "update-browserslist-db": "^1.3.4"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/cac": {
      "version": "6.7.14",
      "resolved": "https://registry.npmjs.org/cac/-/cac-6.7.14.tgz",
      "integrity": "sha512-b6Ilus+c3RrdDk+JhLKUAQfzzgLEPy6wcXqS7f/xe1EETvsDP6GORG7SFuOs6cID5YkqchW/LXZbX5bc8j7ZcQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/call-bind": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.9.tgz",
      "integrity": "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "get-intrinsic": "^1.3.0",
        "set-function-length": "^1.2.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001822",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001822.tgz",
      "integrity": "sha512-Y3fvWQWzc69dlCyr07tuNrEhotv+db5FpMSPD3slZnkPKwRNOKwFBz2dP966XUmWMXLTOt+YShkFoQoom3U7hg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chai": {
      "version": "5.3.3",
      "resolved": "https://registry.npmjs.org/chai/-/chai-5.3.3.tgz",
      "integrity": "sha512-4zNhdJD/iOjSH0A05ea+Ke6MU5mmpQcbQsSOkgdaUMJ9zTlDTD/GYlwohmIE2u0gaxHYiVHEn1Fw9mZ/ktJWgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "assertion-error": "^2.0.1",
        "check-error": "^2.1.1",
        "deep-eql": "^5.0.1",
        "loupe": "^3.1.0",
        "pathval": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/check-error": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/check-error/-/check-error-2.1.3.tgz",
      "integrity": "sha512-PAJdDJusoxnwm1VwW07VWwUN1sl7smmC3OKggvndJFadxxDRyFJBX/ggnu/KE4kQAB7a3Dp8f/YXC1FlUprWmA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 16"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/damerau-levenshtein": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
      "integrity": "sha512-sdQSFB7+llfUcQHUQO3+B8ERRj0Oa4w9POWMI/puGtuf7gFywGmkaLCElnudfTiKZV+NvHqL0ifzdrI8Ro7ESA==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/data-view-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
      "integrity": "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/data-view-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-byte-length/-/data-view-byte-length-1.0.2.tgz",
      "integrity": "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/inspect-js"
      }
    },
    "node_modules/data-view-byte-offset": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/data-view-byte-offset/-/data-view-byte-offset-1.0.1.tgz",
      "integrity": "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-eql": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
      "integrity": "sha512-h5k/5U50IJJFpzfL6nO9jaaumfjO/f2NjK/oYB2Djzm4p9L+3T9qWpZqZ2hAbLPuuYq9wrU08WQyBTL5GbPk5Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/define-data-property": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/define-data-property/-/define-data-property-1.1.4.tgz",
      "integrity": "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0",
        "es-errors": "^1.3.0",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/define-properties": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.1.tgz",
      "integrity": "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.0.1",
        "has-property-descriptors": "^1.0.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.478",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.478.tgz",
      "integrity": "sha512-pftG+ma5Lm8O6/p45bhYT6StBN5ziQymaRzmCZwFl8DwWHKPPD93FdOmP1aqftcepolQYvrcyTLa17kE8Yf+jg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-abstract": {
      "version": "1.24.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.2.tgz",
      "integrity": "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.2",
        "arraybuffer.prototype.slice": "^1.0.4",
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "data-view-buffer": "^1.0.2",
        "data-view-byte-length": "^1.0.2",
        "data-view-byte-offset": "^1.0.1",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-set-tostringtag": "^2.1.0",
        "es-to-primitive": "^1.3.0",
        "function.prototype.name": "^1.1.8",
        "get-intrinsic": "^1.3.0",
        "get-proto": "^1.0.1",
        "get-symbol-description": "^1.1.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "internal-slot": "^1.1.0",
        "is-array-buffer": "^3.0.5",
        "is-callable": "^1.2.7",
        "is-data-view": "^1.0.2",
        "is-negative-zero": "^2.0.3",
        "is-regex": "^1.2.1",
        "is-set": "^2.0.3",
        "is-shared-array-buffer": "^1.0.4",
        "is-string": "^1.1.1",
        "is-typed-array": "^1.1.15",
        "is-weakref": "^1.1.1",
        "math-intrinsics": "^1.1.0",
        "object-inspect": "^1.13.4",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.7",
        "own-keys": "^1.0.1",
        "regexp.prototype.flags": "^1.5.4",
        "safe-array-concat": "^1.1.3",
        "safe-push-apply": "^1.0.0",
        "safe-regex-test": "^1.1.0",
        "set-proto": "^1.0.0",
        "stop-iteration-iterator": "^1.1.0",
        "string.prototype.trim": "^1.2.10",
        "string.prototype.trimend": "^1.0.9",
        "string.prototype.trimstart": "^1.0.8",
        "typed-array-buffer": "^1.0.3",
        "typed-array-byte-length": "^1.0.3",
        "typed-array-byte-offset": "^1.0.4",
        "typed-array-length": "^1.0.7",
        "unbox-primitive": "^1.1.0",
        "which-typed-array": "^1.1.19"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-abstract-get": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/es-abstract-get/-/es-abstract-get-1.0.0.tgz",
      "integrity": "sha512-6PMWXpdhshVvFp+FoWYs1EvG1Nj0tvk0dZM+XcK0xMEM1czRVcP6ohqPWHy6qPagSpC8j4+p89WXlT+xXJs/fg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "is-callable": "^1.2.7",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-iterator-helpers": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.4.0.tgz",
      "integrity": "sha512-c/A0P0oxkACDc+cKWw8evLXK83oBKgn0qPOqCYT4x9uolpCIJAcYvJC9QYKNDRPsTeGyCrQ326jrvgZWdCdK5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-set-tostringtag": "^2.1.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "iterator.prototype": "^1.1.5",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-module-lexer": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.7.0.tgz",
      "integrity": "sha512-jEQoCwk8hyb2AZziIOLhDqpm5+2ww5uIE6lkO/6jcOCusfk6LhMHpXXfBLXTZ7Ydyt0j4VoUQv6uGNYbdW+kBA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-shim-unscopables": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/es-shim-unscopables/-/es-shim-unscopables-1.1.0.tgz",
      "integrity": "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-to-primitive": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.3.4.tgz",
      "integrity": "sha512-yPDz7wqpg1/mmHLmS3tcfTfbw5f1eryXvyghYBffGdERwe+mV7ZcWzTR8LR17Kvqt3qfPurjlonmnq3MKXIOXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-abstract-get": "^1.0.0",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "is-callable": "^1.2.7",
        "is-date-object": "^1.1.0",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/esbuild": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.28.2.tgz",
      "integrity": "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.28.2",
        "@esbuild/android-arm": "0.28.2",
        "@esbuild/android-arm64": "0.28.2",
        "@esbuild/android-x64": "0.28.2",
        "@esbuild/darwin-arm64": "0.28.2",
        "@esbuild/darwin-x64": "0.28.2",
        "@esbuild/freebsd-arm64": "0.28.2",
        "@esbuild/freebsd-x64": "0.28.2",
        "@esbuild/linux-arm": "0.28.2",
        "@esbuild/linux-arm64": "0.28.2",
        "@esbuild/linux-ia32": "0.28.2",
        "@esbuild/linux-loong64": "0.28.2",
        "@esbuild/linux-mips64el": "0.28.2",
        "@esbuild/linux-ppc64": "0.28.2",
        "@esbuild/linux-riscv64": "0.28.2",
        "@esbuild/linux-s390x": "0.28.2",
        "@esbuild/linux-x64": "0.28.2",
        "@esbuild/netbsd-arm64": "0.28.2",
        "@esbuild/netbsd-x64": "0.28.2",
        "@esbuild/openbsd-arm64": "0.28.2",
        "@esbuild/openbsd-x64": "0.28.2",
        "@esbuild/openharmony-arm64": "0.28.2",
        "@esbuild/sunos-x64": "0.28.2",
        "@esbuild/win32-arm64": "0.28.2",
        "@esbuild/win32-ia32": "0.28.2",
        "@esbuild/win32-x64": "0.28.2"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.5",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.5.tgz",
      "integrity": "sha512-DgZS62aPLXKlnxILS/AYCoRvHaZeXceIzlXPkkGGzJWSow1aEk0lbTlxUSlyjC8jcaKxAdOnTDz+o1JFSBsyjw==",
      "deprecated": "This version is no longer supported. Please see https://eslint.org/version-support for other options.",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.6",
        "@eslint/js": "9.39.5",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-15.5.29.tgz",
      "integrity": "sha512-44lyVuWyyuYgLeuJvuHSMcvHsfC/JLae6C2xCdi6neWAxk94vKm5qGBFmTrGQavQ2JIL2Jrll16incpNlKOJbQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@next/eslint-plugin-next": "15.5.29",
        "@rushstack/eslint-patch": "^1.10.3",
        "@typescript-eslint/eslint-plugin": "^5.4.2 || ^6.0.0 || ^7.0.0 || ^8.0.0",
        "@typescript-eslint/parser": "^5.4.2 || ^6.0.0 || ^7.0.0 || ^8.0.0",
        "eslint-import-resolver-node": "^0.3.6",
        "eslint-import-resolver-typescript": "^3.5.2",
        "eslint-plugin-import": "^2.31.0",
        "eslint-plugin-jsx-a11y": "^6.10.0",
        "eslint-plugin-react": "^7.37.0",
        "eslint-plugin-react-hooks": "^5.0.0"
      },
      "peerDependencies": {
        "eslint": "^7.23.0 || ^8.0.0 || ^9.0.0",
        "typescript": ">=3.3.1"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-import-resolver-node": {
      "version": "0.3.10",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.10.tgz",
      "integrity": "sha512-tRrKqFyCaKict5hOd244sL6EQFNycnMQnBe+j8uqGNXYzsImGbGUU4ibtoaBmv5FLwJwcFJNeg1GeVjQfbMrDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7",
        "is-core-module": "^2.16.1",
        "resolve": "^2.0.0-next.6"
      }
    },
    "node_modules/eslint-import-resolver-node/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-import-resolver-typescript": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-typescript/-/eslint-import-resolver-typescript-3.10.1.tgz",
      "integrity": "sha512-A1rHYb06zjMGAxdLSkN2fXPBwuSaQ0iO5M/hdyS0Ajj1VBaRp0sPD3dn1FhME3c/JluGFbwSxyCfqdSbtQLAHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@nolyfill/is-core-module": "1.0.39",
        "debug": "^4.4.0",
        "get-tsconfig": "^4.10.0",
        "is-bun-module": "^2.0.0",
        "stable-hash": "^0.0.5",
        "tinyglobby": "^0.2.13",
        "unrs-resolver": "^1.6.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-import-resolver-typescript"
      },
      "peerDependencies": {
        "eslint": "*",
        "eslint-plugin-import": "*",
        "eslint-plugin-import-x": "*"
      },
      "peerDependenciesMeta": {
        "eslint-plugin-import": {
          "optional": true
        },
        "eslint-plugin-import-x": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils": {
      "version": "2.14.0",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.14.0.tgz",
      "integrity": "sha512-W2WCRZ9Dqntd+2u8jJcVMV2PKulc6RdLgUUoh/yQr3uB6lo/ZOeGx11sv60/8S4QFFKNslAlWhr9u0Ef7ZW6Ig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import": {
      "version": "2.32.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.32.0.tgz",
      "integrity": "sha512-whOE1HFo/qJDyX4SnXzP4N6zOWn79WhnCUY/iDR0mPfQZO8wcYE4JClzI2oZrhBnnMUCBCHZhO6VQyoBU95mZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rtsao/scc": "^1.1.0",
        "array-includes": "^3.1.9",
        "array.prototype.findlastindex": "^1.2.6",
        "array.prototype.flat": "^1.3.3",
        "array.prototype.flatmap": "^1.3.3",
        "debug": "^3.2.7",
        "doctrine": "^2.1.0",
        "eslint-import-resolver-node": "^0.3.9",
        "eslint-module-utils": "^2.12.1",
        "hasown": "^2.0.2",
        "is-core-module": "^2.16.1",
        "is-glob": "^4.0.3",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "object.groupby": "^1.0.3",
        "object.values": "^1.2.1",
        "semver": "^6.3.1",
        "string.prototype.trimend": "^1.0.9",
        "tsconfig-paths": "^3.15.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/semver": {
      "version": "6.3.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.2.tgz",
      "integrity": "sha512-GYrCADwpu6yV5OAvchkQ27Z5wwMxWAEMg5NNWjyHh/5DboFFqbdbvYNIvZouQpxXyeMPoTOh0vdPYKlf0ZswdQ==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-plugin-jsx-a11y": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.10.2.tgz",
      "integrity": "sha512-scB3nz4WmG75pV8+3eRUQOHZlNSUhFNq37xnpgRkCCELU3XMvXAxLk1eqWWyE22Ki4Q01Fnsw9BA3cJHDPgn2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "aria-query": "^5.3.2",
        "array-includes": "^3.1.8",
        "array.prototype.flatmap": "^1.3.2",
        "ast-types-flow": "^0.0.8",
        "axe-core": "^4.10.0",
        "axobject-query": "^4.1.0",
        "damerau-levenshtein": "^1.0.8",
        "emoji-regex": "^9.2.2",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^3.3.5",
        "language-tags": "^1.0.9",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "safe-regex-test": "^1.0.3",
        "string.prototype.includes": "^2.0.1"
      },
      "engines": {
        "node": ">=4.0"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-react": {
      "version": "7.37.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.37.5.tgz",
      "integrity": "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.8",
        "array.prototype.findlast": "^1.2.5",
        "array.prototype.flatmap": "^1.3.3",
        "array.prototype.tosorted": "^1.1.4",
        "doctrine": "^2.1.0",
        "es-iterator-helpers": "^1.2.1",
        "estraverse": "^5.3.0",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^2.4.1 || ^3.0.0",
        "minimatch": "^3.1.2",
        "object.entries": "^1.1.9",
        "object.fromentries": "^2.0.8",
        "object.values": "^1.2.1",
        "prop-types": "^15.8.1",
        "resolve": "^2.0.0-next.5",
        "semver": "^6.3.1",
        "string.prototype.matchall": "^4.0.12",
        "string.prototype.repeat": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.2.0.tgz",
      "integrity": "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react/node_modules/semver": {
      "version": "6.3.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.2.tgz",
      "integrity": "sha512-GYrCADwpu6yV5OAvchkQ27Z5wwMxWAEMg5NNWjyHh/5DboFFqbdbvYNIvZouQpxXyeMPoTOh0vdPYKlf0ZswdQ==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estree-walker": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
      "integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "^1.0.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/expect-type": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/expect-type/-/expect-type-1.4.0.tgz",
      "integrity": "sha512-KfYbmpRm0VbLjEvVa9yGwCi9GI34xvi7A/HXYWQO65CSD2u3MczUJSuwXKFIxlGsgBQizV9q5J9NHj4VG0n+pA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
      "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.4.tgz",
      "integrity": "sha512-5+ybhBZANEJxaH3X5evAFatUxLfEHSr7n6kYJ+1Qd0mUqr4eu9gIf6GDbWHf8RJijHrjjO8G+la14SlL2SeS1Q==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/for-each": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.5.tgz",
      "integrity": "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/function.prototype.name": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.2.0.tgz",
      "integrity": "sha512-jObKIik1P2QjPHP5nz5BaOtUlfgS0fWo8IUByNXkM+o+02sJOi94em77GwJKQSJ3gfPHdgzLNrHc1uokV4P/ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2",
        "hasown": "^2.0.4",
        "is-callable": "^1.2.7",
        "is-document.all": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/generator-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/generator-function/-/generator-function-2.0.1.tgz",
      "integrity": "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-symbol-description": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.1.0.tgz",
      "integrity": "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.14.3",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.3.tgz",
      "integrity": "sha512-++QEw4DIY7WGoukz+/+A/8dGYPT9l9yIadnmSgZ8Rjr3YVSVDipQSO9CdnJo9ePqFqUUqh+wk9uIaoiAwsiPkA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globalthis": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
      "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.2.1",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-bigints": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
      "integrity": "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-property-descriptors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.2.tgz",
      "integrity": "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-proto": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.2.0.tgz",
      "integrity": "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/internal-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.1.0.tgz",
      "integrity": "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "hasown": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/is-array-buffer": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
      "integrity": "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-async-function": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-async-function/-/is-async-function-2.1.1.tgz",
      "integrity": "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "async-function": "^1.0.0",
        "call-bound": "^1.0.3",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bigint": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.1.0.tgz",
      "integrity": "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-bigints": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-boolean-object": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.2.2.tgz",
      "integrity": "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bun-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-bun-module/-/is-bun-module-2.0.0.tgz",
      "integrity": "sha512-gNCGbnnnnFAUGKeZ9PdbyeGYJqewpmc2aKHUEMO5nQPWU9lOmv7jcmQIv+qHD8fXW6W7qfuCwX4rY9LNRjXrkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.7.1"
      }
    },
    "node_modules/is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.18.0",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.18.0.tgz",
      "integrity": "sha512-qyax9fgaKOEC4qK8WZn7Q4IcoZC9RC1O1fFxRcRTq/oMMkWT/uXpqpXa12kzWR409zAt1drYN9N9BO26UmBCmw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-data-view": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-data-view/-/is-data-view-1.0.2.tgz",
      "integrity": "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "is-typed-array": "^1.1.13"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-date-object": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.1.0.tgz",
      "integrity": "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-document.all": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-document.all/-/is-document.all-1.0.0.tgz",
      "integrity": "sha512-+XSoyS05OdBbhFuELhgTCpFNHkpBOJqtsZfUFFpe5QTw+9Sjbh8zitxhQkYAo6wV7e1Vb8cAPvpCk9jGam/82g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-finalizationregistry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-finalizationregistry/-/is-finalizationregistry-1.1.1.tgz",
      "integrity": "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-generator-function": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.1.2.tgz",
      "integrity": "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "generator-function": "^2.0.0",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-map/-/is-map-2.0.3.tgz",
      "integrity": "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-negative-zero": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.3.tgz",
      "integrity": "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-number-object": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.1.1.tgz",
      "integrity": "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-set": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-set/-/is-set-2.0.3.tgz",
      "integrity": "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-shared-array-buffer": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.4.tgz",
      "integrity": "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-string": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.1.1.tgz",
      "integrity": "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-symbol": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.1.1.tgz",
      "integrity": "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-symbols": "^1.1.0",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-typed-array": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.15.tgz",
      "integrity": "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakmap": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
      "integrity": "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.1.1.tgz",
      "integrity": "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakset": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.4.tgz",
      "integrity": "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/isarray": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
      "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/iterator.prototype": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/iterator.prototype/-/iterator.prototype-1.1.5.tgz",
      "integrity": "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "get-proto": "^1.0.0",
        "has-symbols": "^1.1.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.3.2.tgz",
      "integrity": "sha512-SFNOvSJ+Dgf/9An904Yx+CgSlIPCkIpao4qo51lpee25TIRejdH3rhR4EZMGoNx3/TP3O+wzWuiTFl4sqbltzA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.0"
      },
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/jsx-ast-utils": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-3.3.5.tgz",
      "integrity": "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.6",
        "array.prototype.flat": "^1.3.1",
        "object.assign": "^4.1.4",
        "object.values": "^1.1.6"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/language-subtag-registry": {
      "version": "0.3.23",
      "resolved": "https://registry.npmjs.org/language-subtag-registry/-/language-subtag-registry-0.3.23.tgz",
      "integrity": "sha512-0K65Lea881pHotoGEa5gDlMxt3pctLi2RplBb7Ezh4rRdLEOtgi7n4EwK9lamnUCkKBqaeKRVebTq6BAxSkpXQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/language-tags": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/language-tags/-/language-tags-1.0.9.tgz",
      "integrity": "sha512-MbjN408fEndfiQXbFQ1vnd+1NoLDsnQW41410oQBXiyXDMYH5z505juWa4KUE1LqxRC7DgOgZDbKLxHIwm27hA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "language-subtag-registry": "^0.3.20"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.4",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.4.tgz",
      "integrity": "sha512-zJZyBmQhArDRefuWTypZxwDpFDIYmrj8ypSBvwGD5P13Y95s6DjzKgu4DVdGbeQa5PDEsAOCAPNk4X+QOR006w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/loupe": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/loupe/-/loupe-3.2.1.tgz",
      "integrity": "sha512-CdzqowRJCeLU72bHvWqwRBBlLcMEtIvGrlvef74kMnV2AolS9Y8xUv1I0U/MNAWMhBlKIoyuEgoJ0t/bbwHbLQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/napi-postinstall": {
      "version": "0.3.8",
      "resolved": "https://registry.npmjs.org/napi-postinstall/-/napi-postinstall-0.3.8.tgz",
      "integrity": "sha512-dHbDC5V1g/EI8OLEtL4Iuwbu0fgzmyykxenn2KnlsX9XdhTXL3gWnfbbP+ab+oUcgV6CFpb8QGyQt/ZXA0UXig==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "napi-patch": "lib/patch.js",
        "napi-postinstall": "lib/cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/napi-postinstall"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/next": {
      "version": "15.5.29",
      "resolved": "https://registry.npmjs.org/next/-/next-15.5.29.tgz",
      "integrity": "sha512-93AMszTCdi9Az7fD5VzcWy46SHCdQF45+i53K0LpDc4dDXCwB9P1SxP1wBYZKW6dF3HJnz41jyEni1vmgCluiw==",
      "license": "MIT",
      "dependencies": {
        "@next/env": "15.5.29",
        "@swc/helpers": "0.5.15",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.4.31",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": "^18.18.0 || ^19.8.0 || >= 20.0.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "15.5.29",
        "@next/swc-darwin-x64": "15.5.29",
        "@next/swc-linux-arm64-gnu": "15.5.29",
        "@next/swc-linux-arm64-musl": "15.5.29",
        "@next/swc-linux-x64-gnu": "15.5.29",
        "@next/swc-linux-x64-musl": "15.5.29",
        "@next/swc-win32-arm64-msvc": "15.5.29",
        "@next/swc-win32-x64-msvc": "15.5.29",
        "sharp": "^0.34.3 || ^0.35.5"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.4.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
      "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.6",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/node-exports-info": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/node-exports-info/-/node-exports-info-1.6.2.tgz",
      "integrity": "sha512-kXs9Go0cah0qHVV2v389IXQLdLCeE1xfFtjOAF+iobu0OIoG1pje8At2vMHyaPMiPMnG/LWP50twML21eMcAag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array.prototype.flatmap": "^1.3.3",
        "es-errors": "^1.3.0",
        "object.entries": "^1.1.9",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/node-exports-info/node_modules/semver": {
      "version": "6.3.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.2.tgz",
      "integrity": "sha512-GYrCADwpu6yV5OAvchkQ27Z5wwMxWAEMg5NNWjyHh/5DboFFqbdbvYNIvZouQpxXyeMPoTOh0vdPYKlf0ZswdQ==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.63",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.63.tgz",
      "integrity": "sha512-6li2QanLsAXpIH2R6j77MzRyvOyrvdTqlKtO4CgBdHGNvN99ZZfyxszHc5o5+IZBWD5u6Hzwg83JoGXmqZNG9Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.assign": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.7.tgz",
      "integrity": "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0",
        "has-symbols": "^1.1.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.entries": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.9.tgz",
      "integrity": "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.fromentries": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.8.tgz",
      "integrity": "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.groupby": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/object.groupby/-/object.groupby-1.0.3.tgz",
      "integrity": "sha512-+Lhy3TQTuzXI5hevh8sBGqbmurHbbIjAi0Z4S63nthVLmLxfbj4T54a4CfZrXIrt9iP4mVAPYMo/v99taj3wjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.values": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.2.1.tgz",
      "integrity": "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/own-keys": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/own-keys/-/own-keys-1.0.2.tgz",
      "integrity": "sha512-19YVAg7T+WTrxggPukVq7DjTv6+PJ867TmhCvBsYwmbFCsZd344rq2Ld1p0wo8f8Qrrhgp82c6FJRqdXWtSEhg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "object-keys": "^1.1.1",
        "safe-push-apply": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pathe": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
      "integrity": "sha512-WUjGcAqP1gQacoQe+OBJsFA7Ld4DyXuUIjZ5cc75cLHvJ7dtNsTugphxIADwspS+AraAUePCKrSVtPLFj/F88w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pathval": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pathval/-/pathval-2.0.1.tgz",
      "integrity": "sha512-//nshmD55c46FuFw26xV/xFAaB5HF9Xdap7HJBBnrKdAd6/GxDBaNA1870O79+9ueg61cZLSVc+OaFlfmObYVQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14.16"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/possible-typed-array-names": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/possible-typed-array-names/-/possible-typed-array-names-1.1.0.tgz",
      "integrity": "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.32",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.32.tgz",
      "integrity": "sha512-LJlKCCAUFKOuZxipUdYw1NzIITEsPcgyOG9LkvRJvuKj/bRzbuRY0ARXvL0pWGpsZvn8jku+LMep2eU0seHp8g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.20",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-import/node_modules/resolve": {
      "version": "1.22.14",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.14.tgz",
      "integrity": "sha512-1ZjYvR9sbkiwC5+9QHetqW5HmA2pHRMaoupD01t2HlYnV/vydC2zPwLixhsMieSWVZt0JJRg5LVIk0Ow1D/TrA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.18.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.5",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.5.tgz",
      "integrity": "sha512-TEHFzb5KRDKaOgJ4TYE+0jyJtFbjLvkdVOu0fZ2b6MTWzoqZd4Le+61aEppWkvTlYePgOX4ATL1wsAIPMLTw6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.1.tgz",
      "integrity": "sha512-QNhWdt7nrgVWWQG58QuGsAR3jv3Hbe4mb4vz7w2csnHavciZJgda1CPNaldF6eVxv90ud3jUXpKlHL69gO38yw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz",
      "integrity": "sha512-Y0bARz53lhEC1NMCASs0/j+faB/zqt3R8hpvg1e8+61ZVJ4UL0UdC4cBbXfZMcIuhrfgeILTLe+ZeBCavQPtKQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/reflect.getprototypeof": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/reflect.getprototypeof/-/reflect.getprototypeof-1.0.10.tgz",
      "integrity": "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.7",
        "get-proto": "^1.0.1",
        "which-builtin-type": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/regexp.prototype.flags": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.4.tgz",
      "integrity": "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-errors": "^1.3.0",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve": {
      "version": "2.0.0-next.7",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.7.tgz",
      "integrity": "sha512-tqt+NBWwyaMgw3zDsnygx4CByWjQEJHOPMdslYhppaQSJUtL/D4JO9CcBBlhPoI8lz9oJIDXkwXfhF4aWqP8xQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.2",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.67.5",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.67.5.tgz",
      "integrity": "sha512-3Ve5VH1hacCVutdpbmu/htg4kz+JCOIWgy4Q3hjHPYGHeHeIElNHJ0LcJ3rCfIsd5G7qOl5k5mwpzGMj9kdHPA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "^1.0.10"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.67.5",
        "@rollup/rollup-android-arm64": "4.67.5",
        "@rollup/rollup-android-x64": "4.67.5",
        "@rollup/rollup-darwin-arm64": "4.67.5",
        "@rollup/rollup-darwin-x64": "4.67.5",
        "@rollup/rollup-freebsd-arm64": "4.67.5",
        "@rollup/rollup-freebsd-x64": "4.67.5",
        "@rollup/rollup-linux-arm-gnueabihf": "4.67.5",
        "@rollup/rollup-linux-arm-musleabihf": "4.67.5",
        "@rollup/rollup-linux-arm64-gnu": "4.67.5",
        "@rollup/rollup-linux-arm64-musl": "4.67.5",
        "@rollup/rollup-linux-loong64-gnu": "4.67.5",
        "@rollup/rollup-linux-loong64-musl": "4.67.5",
        "@rollup/rollup-linux-ppc64-gnu": "4.67.5",
        "@rollup/rollup-linux-ppc64-musl": "4.67.5",
        "@rollup/rollup-linux-riscv64-gnu": "4.67.5",
        "@rollup/rollup-linux-riscv64-musl": "4.67.5",
        "@rollup/rollup-linux-s390x-gnu": "4.67.5",
        "@rollup/rollup-linux-x64-gnu": "4.67.5",
        "@rollup/rollup-linux-x64-musl": "4.67.5",
        "@rollup/rollup-openbsd-x64": "4.67.5",
        "@rollup/rollup-openharmony-arm64": "4.67.5",
        "@rollup/rollup-win32-arm64-msvc": "4.67.5",
        "@rollup/rollup-win32-ia32-msvc": "4.67.5",
        "@rollup/rollup-win32-x64-gnu": "4.67.5",
        "@rollup/rollup-win32-x64-msvc": "4.67.5",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safe-array-concat": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.4.tgz",
      "integrity": "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "has-symbols": "^1.1.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">=0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-push-apply": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
      "integrity": "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.8.6",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.6.tgz",
      "integrity": "sha512-9lpSSU4Mly3mrtruwLs1eLK6+gzbzqeBFwRNjIjE+9LuDpWdYctrQlQ3ej1Ilgi7gknpsTRnPoLP8DpCHqHIJw==",
      "devOptional": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/set-function-length": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
      "integrity": "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.2.4",
        "gopd": "^1.0.1",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-function-name": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/set-function-name/-/set-function-name-2.0.2.tgz",
      "integrity": "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-proto": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/set-proto/-/set-proto-1.0.0.tgz",
      "integrity": "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/sharp": {
      "version": "0.35.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.35.5.tgz",
      "integrity": "sha512-Ywn4OnzGukp7CDMrp08RQ50YKmuwG47brZgIVPTvBaaAfQlRlygrRqSrxdCiL9M+LlzLBiJ68IR1QqvzHyjC7g==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.1.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.8.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.35.5",
        "@img/sharp-darwin-x64": "0.35.5",
        "@img/sharp-freebsd-wasm32": "0.35.5",
        "@img/sharp-libvips-darwin-arm64": "1.3.4",
        "@img/sharp-libvips-darwin-x64": "1.3.4",
        "@img/sharp-libvips-linux-arm": "1.3.4",
        "@img/sharp-libvips-linux-arm64": "1.3.4",
        "@img/sharp-libvips-linux-ppc64": "1.3.4",
        "@img/sharp-libvips-linux-riscv64": "1.3.4",
        "@img/sharp-libvips-linux-s390x": "1.3.4",
        "@img/sharp-libvips-linux-x64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.3.4",
        "@img/sharp-linux-arm": "0.35.5",
        "@img/sharp-linux-arm64": "0.35.5",
        "@img/sharp-linux-ppc64": "0.35.5",
        "@img/sharp-linux-riscv64": "0.35.5",
        "@img/sharp-linux-s390x": "0.35.5",
        "@img/sharp-linux-x64": "0.35.5",
        "@img/sharp-linuxmusl-arm64": "0.35.5",
        "@img/sharp-linuxmusl-x64": "0.35.5",
        "@img/sharp-webcontainers-wasm32": "0.35.5",
        "@img/sharp-win32-arm64": "0.35.5",
        "@img/sharp-win32-ia32": "0.35.5",
        "@img/sharp-win32-x64": "0.35.5"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.1.tgz",
      "integrity": "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4",
        "side-channel-list": "^1.0.1",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/siginfo": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/siginfo/-/siginfo-2.0.0.tgz",
      "integrity": "sha512-ybx0WO1/8bSBLEWXZvEd7gMW3Sn3JFlW3TvX1nREbDLRNQNaeNN8WK0meBwPdAaOI7TtRRRJn/Es1zhrrCHu7g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stable-hash": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stable-hash/-/stable-hash-0.0.5.tgz",
      "integrity": "sha512-+L3ccpzibovGXFK+Ap/f8LOS0ahMrHTf3xu7mMLSpEGU0EO9ucaysSylKo9eRDFNhWve/y275iPmIZ4z39a9iA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/stackback": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/stackback/-/stackback-0.0.2.tgz",
      "integrity": "sha512-1XMJE5fQo1jGH6Y/7ebnwPOBEkIEnT4QF32d5R1+VXdXveM0IBMJt8zfaxX1P3QhVwrYe+576+jkANtSS2mBbw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/std-env": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/std-env/-/std-env-3.10.0.tgz",
      "integrity": "sha512-5GS12FdOZNliM5mAOxFRg7Ir0pWz8MdpYm6AY6VPkGpbA7ZzmbzNcBJQ0GPvvyWgcY7QAhCgf9Uy89I03faLkg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/stop-iteration-iterator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/stop-iteration-iterator/-/stop-iteration-iterator-1.1.0.tgz",
      "integrity": "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "internal-slot": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.includes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.includes/-/string.prototype.includes-2.0.1.tgz",
      "integrity": "sha512-o7+c9bW6zpAdJHTtujeePODAhkuicdAryFsfVKwA+wGw89wJ4GTY484WTucM9hLtDEOpOvI+aHnzqnC5lHp4Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.matchall": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/string.prototype.matchall/-/string.prototype.matchall-4.1.0.tgz",
      "integrity": "sha512-tHNHTxInrYLCga9O9YGxWA3G9/nnzQw8UGAyqGx3Ar1pSTTzIuM4woFSq4SowkXCjJIwq5sIiQvEfRI9tCH1qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "regexp.prototype.flags": "^1.5.4",
        "set-function-name": "^2.0.2",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.repeat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/string.prototype.repeat/-/string.prototype.repeat-1.0.0.tgz",
      "integrity": "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "node_modules/string.prototype.trim": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.11.tgz",
      "integrity": "sha512-PwvK7BU+CMTJGYQCTZb5RWXIML92lftJLhQz1tBzgKiqGxJaMlBAa48POXaNAC2s4y8jr3EFqrkF9+44neS46w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-data-property": "^1.1.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "has-property-descriptors": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimend": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.10.tgz",
      "integrity": "sha512-2+3aDAOmPTmuFwjDnmJG2ctEkQKVki7vOSqaxkv42Mowj1V6PnvuwFCRrR5lChUux1TBskPjfkeTOhqczDMxTw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimstart": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.8.tgz",
      "integrity": "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/strip-literal": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/strip-literal/-/strip-literal-3.1.0.tgz",
      "integrity": "sha512-8r3mkIM/2+PpjHoOtiAW8Rg3jJLHaV7xPwG+YRGrv6FP0wwk/toTpATxWYOW0BKdWwl82VT2tFYi5DlROa0Mxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^9.0.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/strip-literal/node_modules/js-tokens": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-9.0.1.tgz",
      "integrity": "sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tailwindcss/node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/tailwindcss/node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/tailwindcss/node_modules/resolve": {
      "version": "1.22.14",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.14.tgz",
      "integrity": "sha512-1ZjYvR9sbkiwC5+9QHetqW5HmA2pHRMaoupD01t2HlYnV/vydC2zPwLixhsMieSWVZt0JJRg5LVIk0Ow1D/TrA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.18.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinybench": {
      "version": "2.9.0",
      "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
      "integrity": "sha512-0+DUvqWMValLmha6lr4kD8iAMK1HzV0/aKnCtWb9v9641TnP/MFb7Pc2bxoxQjTXAErryXVgUOfv2YqNllqGeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyexec": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/tinyexec/-/tinyexec-0.3.2.tgz",
      "integrity": "sha512-KQQR9yN7R5+OSwaK0XQoj22pwHoTlgYqmUscPYoknOoWCWfj/5/ABTMRi69FrKU5ffPVh5QcFikpWJI/P1ocHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/tinypool": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/tinypool/-/tinypool-1.1.1.tgz",
      "integrity": "sha512-Zba82s87IFq9A9XmjiX5uZA/ARWDrB03OHlq+Vw1fSdt0I+4/Kutwy8BP4Y/y/aORMo61FQ0vIb5j44vSo5Pkg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      }
    },
    "node_modules/tinyrainbow": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/tinyrainbow/-/tinyrainbow-2.0.0.tgz",
      "integrity": "sha512-op4nsTR47R6p0vMUUoYl/a+ljLFVtlfaXkLQmqfLR1qHma1h/ysYk4hEXZ880bf2CYgTskvTa/e196Vd5dDQXw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tinyspy": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/tinyspy/-/tinyspy-4.0.6.tgz",
      "integrity": "sha512-u8KszXvGfU68hVcZpRHKG28T0krMuv2G5nDhiHaMLen/gIuFEgIJhaJuO69qjnXg5paSrbPMFfx3brNuN8eVSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tsconfig-paths": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
      "integrity": "sha512-2Ac2RgzDe/cn48GvOe3M+o82pEFewD3UPbyoUHHdKasHwJKjds4fLXWf/Ux5kATBKN20oaFGu+jbElp1pos0mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      }
    },
    "node_modules/tslib": {
      "version": "2.9.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.9.1.tgz",
      "integrity": "sha512-a4Ux9VKuIMHsOS7ENbEq6hK2ZGYIT27Rtl0E4eD9KqwxhKiQeMZE/9xb3IdYwWaSOyIBQLExhQgXDTYoiCxnWA==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typed-array-buffer": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
      "integrity": "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/typed-array-byte-length": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-byte-length/-/typed-array-byte-length-1.0.3.tgz",
      "integrity": "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-byte-offset": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/typed-array-byte-offset/-/typed-array-byte-offset-1.0.5.tgz",
      "integrity": "sha512-0FHJvLPqZ7KJzp17O13jfsAjsqazgrxBu2zEK95PmUz8lv2+GjRuxUInCr2Rk9Dms3ihN21zJ929ZO43yJ95QQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "reflect.getprototypeof": "^1.0.10"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-length": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.8.tgz",
      "integrity": "sha512-phPGCwqr2+Qo0fwniCE8e4pKnGu/yFb5nD5Y8bf0EEeiI5GklnACYA9GFy/DrAeRrKHXvHn+1SUsOWgJp6RO+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "possible-typed-array-names": "^1.1.0",
        "reflect.getprototypeof": "^1.0.10"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/unbox-primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
      "integrity": "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.1.0",
        "which-boxed-primitive": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/uncrypto": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/uncrypto/-/uncrypto-0.1.3.tgz",
      "integrity": "sha512-Ql87qFHB3s/De2ClA9e0gsnS6zXG27SkTiSJwjCc9MebbfapQfuPzumMIUMi38ezPZVNFcHI9sUIepeQfw8J8Q==",
      "license": "MIT"
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/unrs-resolver": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.13.0.tgz",
      "integrity": "sha512-mcPQo9Vm6kXd84d/WqMiYBi2CcA57QHBX/ev5PoUEb8b2oQzUvJ6xYsfseQblnCncgnVmCZGWiFwK7KkS5JZJA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "napi-postinstall": "^0.3.7"
      },
      "funding": {
        "url": "https://opencollective.com/unrs-resolver"
      },
      "optionalDependencies": {
        "@unrs/resolver-binding-android-arm-eabi": "1.13.0",
        "@unrs/resolver-binding-android-arm64": "1.13.0",
        "@unrs/resolver-binding-darwin-arm64": "1.13.0",
        "@unrs/resolver-binding-darwin-x64": "1.13.0",
        "@unrs/resolver-binding-freebsd-x64": "1.13.0",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.13.0",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.13.0",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-arm64-musl": "1.13.0",
        "@unrs/resolver-binding-linux-loong64-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-loong64-musl": "1.13.0",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.13.0",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-x64-gnu": "1.13.0",
        "@unrs/resolver-binding-linux-x64-musl": "1.13.0",
        "@unrs/resolver-binding-openharmony-arm64": "1.13.0",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.13.0",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.13.0",
        "@unrs/resolver-binding-win32-x64-msvc": "1.13.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.4.tgz",
      "integrity": "sha512-t8wonIOdQyOjtPd2VktlBu6QjTVTks6v8bSi7kd0r2Vll8TK1JYDZtRRdbmCHOAMphkZgrzK+L+vXK4pyZ8t4A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "7.3.7",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.3.7.tgz",
      "integrity": "sha512-AHEzTORMbi7/7aXp7w7KZ5+DCUdSeLsJz0grY8xHpc9DHdYb0vQu6DqJfm2tOw3gDExNgPgnJTXxM6syYFHaCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.27.0 || ^0.28.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite-node": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/vite-node/-/vite-node-3.2.4.tgz",
      "integrity": "sha512-EbKSKh+bh1E1IFxeO0pg1n4dvoOTt0UDiXMd/qn++r98+jPO1xtJilvXldeuQ8giIB5IkpjCgMleHMNEsGH6pg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cac": "^6.7.14",
        "debug": "^4.4.1",
        "es-module-lexer": "^1.7.0",
        "pathe": "^2.0.3",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
      },
      "bin": {
        "vite-node": "vite-node.mjs"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/vite/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/vitest": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/vitest/-/vitest-3.2.7.tgz",
      "integrity": "sha512-KrxIJ62Fd89gfysR4WotlgZABiz2dqFPgqGzX7s+CwsqLFomRH7777ZcrOD6+WVAh7khPQP41A+BKbpcJFrdEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/chai": "^5.2.2",
        "@vitest/expect": "3.2.7",
        "@vitest/mocker": "3.2.7",
        "@vitest/pretty-format": "^3.2.7",
        "@vitest/runner": "3.2.7",
        "@vitest/snapshot": "3.2.7",
        "@vitest/spy": "3.2.7",
        "@vitest/utils": "3.2.7",
        "chai": "^5.2.0",
        "debug": "^4.4.1",
        "expect-type": "^1.2.1",
        "magic-string": "^0.30.17",
        "pathe": "^2.0.3",
        "picomatch": "^4.0.2",
        "std-env": "^3.9.0",
        "tinybench": "^2.9.0",
        "tinyexec": "^0.3.2",
        "tinyglobby": "^0.2.14",
        "tinypool": "^1.1.1",
        "tinyrainbow": "^2.0.0",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0",
        "vite-node": "3.2.4",
        "why-is-node-running": "^2.3.0"
      },
      "bin": {
        "vitest": "vitest.mjs"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      },
      "peerDependencies": {
        "@edge-runtime/vm": "*",
        "@types/debug": "^4.1.12",
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "@vitest/browser": "3.2.7",
        "@vitest/ui": "3.2.7",
        "happy-dom": "*",
        "jsdom": "*"
      },
      "peerDependenciesMeta": {
        "@edge-runtime/vm": {
          "optional": true
        },
        "@types/debug": {
          "optional": true
        },
        "@types/node": {
          "optional": true
        },
        "@vitest/browser": {
          "optional": true
        },
        "@vitest/ui": {
          "optional": true
        },
        "happy-dom": {
          "optional": true
        },
        "jsdom": {
          "optional": true
        }
      }
    },
    "node_modules/vitest/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-boxed-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.1.1.tgz",
      "integrity": "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-bigint": "^1.1.0",
        "is-boolean-object": "^1.2.1",
        "is-number-object": "^1.1.1",
        "is-string": "^1.1.1",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-builtin-type": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/which-builtin-type/-/which-builtin-type-1.2.1.tgz",
      "integrity": "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "function.prototype.name": "^1.1.6",
        "has-tostringtag": "^1.0.2",
        "is-async-function": "^2.0.0",
        "is-date-object": "^1.1.0",
        "is-finalizationregistry": "^1.1.0",
        "is-generator-function": "^1.0.10",
        "is-regex": "^1.2.1",
        "is-weakref": "^1.0.2",
        "isarray": "^2.0.5",
        "which-boxed-primitive": "^1.1.0",
        "which-collection": "^1.0.2",
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-collection": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-collection/-/which-collection-1.0.2.tgz",
      "integrity": "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-map": "^2.0.3",
        "is-set": "^2.0.3",
        "is-weakmap": "^2.0.2",
        "is-weakset": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-typed-array": {
      "version": "1.1.24",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.24.tgz",
      "integrity": "sha512-wk4Mf4pR5mRP7eYuuTBCIQ9d0ud2Fv2jRLQpfgnRjbOxAFHmjKFValgTpitVKzJJS8ajnYQV2Du1SZ8j6b/EUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "for-each": "^0.3.5",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/why-is-node-running": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/why-is-node-running/-/why-is-node-running-2.3.0.tgz",
      "integrity": "sha512-hUrmaWBdVDcxvYqnyh09zunKzROWjbZTiNy8dBEjkS7ehEDQibXJ7XvlmtbwuTclUiIyN+CyXQD4Vmko8fNm8w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "siginfo": "^2.0.0",
        "stackback": "0.0.2"
      },
      "bin": {
        "why-is-node-running": "cli.js"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}
````

## package.json

````json
{
  "name": "rumbo-mundial",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:api": "node tests/api-smoke.mjs",
    "entrega": "node scripts/entrega.mjs"
  },
  "dependencies": {
    "@upstash/redis": "^1.35.3",
    "next": "^15.5.29",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "zod": "^3.25.0"
  },
  "devDependencies": {
    "@types/node": "^22.15.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "typescript": "^5.8.3",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.3",
    "autoprefixer": "^10.4.21",
    "vitest": "^3.2.0",
    "eslint": "^9.25.0",
    "eslint-config-next": "^15.5.29",
    "@eslint/eslintrc": "^3.3.1"
  },
  "engines": {
    "node": "22.x"
  }
}
````

## tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
````

## next-env.d.ts

````typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
````

## next.config.ts

````typescript
import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  experimental: { cpus: 2 },
};
export default config;
````

## tailwind.config.ts

````typescript
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
````

## postcss.config.mjs

````javascript
const config = { plugins: { tailwindcss: {}, autoprefixer: {} } };

export default config;
````

## eslint.config.mjs

````javascript
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
````

## app/api/rooms/[id]/action/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { act } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => act((await params).id, await body(req)));
}
````

## app/api/rooms/[id]/join/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { joinRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => joinRoom((await params).id, await body(req)));
}
````

## app/api/rooms/[id]/route.ts

````typescript
import { NextResponse } from "next/server";
import { respond } from "@/lib/http";
import { getRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(req.url);
  const response = await respond(() =>
    getRoom(
      id,
      req.headers.get("authorization")?.replace(/^Bearer /, "") ?? null,
      req.headers.get("x-heartbeat") === "1",
    ),
  );
  if (response.ok) {
    const data = await response.clone().json();
    if (url.searchParams.get("since") === String(data.game.version))
      return NextResponse.json(
        {
          changed: false,
          inactiveFor: data.inactiveFor,
          playerId: data.playerId,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
  }
  return response;
}
````

## app/api/rooms/route.ts

````typescript
import { body, respond } from "@/lib/http";
import { createRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return respond(async () => createRoom(await body(req)));
}
````

## app/globals.css

````css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root {
  --paper: #f6f3e9;
  --ink: #153f35;
  --line: #d8ddcc;
  --accent: #de553b;
  --muted: #58685b;
  color-scheme: light;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.45;
  font-kerning: normal;
  text-rendering: optimizeLegibility;
}
button,
input,
select {
  font: inherit;
}
button,
a,
input,
select {
  -webkit-tap-highlight-color: transparent;
}
button {
  cursor: pointer;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fffdf6;
  padding: 10px 14px;
  min-height: 44px;
  color: var(--ink);
  touch-action: manipulation;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid #e6ab2c;
  outline-offset: 3px;
}
a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 4px;
}
h1,
h2,
h3,
p {
  margin: 0;
}
h1,
h2,
h3 {
  font-weight: 700;
  text-wrap: balance;
}
h1 {
  font-family: Georgia, serif;
  letter-spacing: -0.045em;
  line-height: 1.02;
}
h2 {
  font-size: 1.35rem;
  line-height: 1.2;
}
h3 {
  font-size: 1rem;
  margin: 18px 0 10px;
}
p {
  margin: 12px 0;
  max-width: 65ch;
}
small {
  font-size: 0.8rem;
  color: var(--muted);
  display: block;
  line-height: 1.4;
}
.eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  margin: 0 0 14px;
}
.brand {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-decoration: none;
  display: flex;
  gap: 24px;
  align-items: center;
}
.brand span {
  font-size: 0.65rem;
  color: var(--muted);
  margin-left: auto;
}
.home,
.room {
  max-width: 1480px;
  margin: auto;
  padding: 28px 40px;
}
.home-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  padding: 95px 0 70px;
  align-items: center;
}
.hero h1 {
  font-size: clamp(4rem, 7.5vw, 7.5rem);
}
.hero h1 span {
  color: var(--accent);
}
.hero h1.home-title {
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  overflow-wrap: anywhere;
  text-wrap: balance;
}
.home-help {
  max-width: 900px;
}
.home-help details {
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
.home-help summary {
  cursor: pointer;
  font-weight: 600;
}
.home-help summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
.home-help p {
  max-width: 75ch;
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.6;
}
.hero > p:not(.eyebrow) {
  font-size: 1.15rem;
  max-width: 39ch;
  margin-top: 25px;
}
.panel {
  background: #fffdf7;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
}
.entry {
  padding: 32px;
  box-shadow: 8px 8px 0 #e3e6d7;
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 480px;
  width: 100%;
}
.tabs {
  display: flex;
  background: #edeedf;
  padding: 4px;
  border-radius: 10px;
}
.tabs button {
  flex: 1;
  border: 0;
  background: transparent;
}
.tabs button[aria-pressed="true"] {
  background: var(--ink);
  color: white;
}
label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 0.9rem;
  font-weight: 600;
}
input,
select {
  border: 1px solid #bdc8b9;
  border-radius: 8px;
  background: #fffef9;
  padding: 12px;
  min-height: 46px;
  min-width: 0;
  width: 100%;
  color: var(--ink);
  font-size: 16px;
}
fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}
legend {
  font-size: 0.9rem;
  margin-bottom: 12px;
}
.colors {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.colors button {
  width: 44px;
  height: 44px;
  color: white;
  border-radius: 50%;
  padding: 0;
  border: 3px solid transparent;
  font-size: 1.5rem;
}
.colors button[aria-pressed="true"] {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}
.primary {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
  font-weight: 700;
}
.route-art {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 35px 0;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.route-art i {
  flex: 1;
  border-bottom: 2px dashed #b8c6af;
  text-align: center;
  font-size: 2rem;
  transform: rotate(-5deg);
  color: var(--accent);
}
.facts {
  display: flex;
  gap: 35px;
}
.facts b {
  font-family: Georgia, serif;
  font-size: 2.3rem;
}
.facts small {
  font-size: 0.7rem;
}
footer {
  border-top: 1px solid var(--line);
  padding: 22px 0;
  margin-top: 30px;
  color: var(--muted);
  font-size: 0.75rem;
}
.error {
  background: #ffede6;
  border: 1px solid #e5b3a2;
  border-radius: 8px;
  padding: 12px;
  color: #923720;
}
.notice {
  background: #e0ebd6;
  padding: 12px;
  border-radius: 8px;
}
.empty {
  max-width: 650px;
  margin: 12vh auto;
}
.empty h1 {
  font-size: 2.8rem;
}
.room-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 24px;
}
.room-code {
  display: flex;
  gap: 10px;
  align-items: center;
}
.room-code b {
  letter-spacing: 0.12em;
  font-size: 1.2rem;
}
.room-code button {
  font-size: 0.8rem;
}
.lobby-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 30px;
  margin: 45px auto;
  max-width: 1100px;
  align-items: start;
}
.lobby h1 {
  font-size: 3.5rem;
  margin-bottom: 24px;
}
.lobby fieldset {
  margin: 24px 0;
}
.passengers {
  list-style: none;
  padding: 0;
  margin: 25px 0;
}
.passengers li {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}
.passengers span {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  display: grid;
  place-items: center;
}
.passengers small {
  margin-left: auto;
}
.guide p {
  margin: 24px 0;
}
.status-strip {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin: 4px 0 18px;
  font-size: 0.85rem;
}
.status-strip i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}
.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}
.game-layout aside {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.board-scroll {
  overflow: auto;
  border-radius: 12px;
  border: 2px solid var(--ink);
  background: #e9eddb;
}
.board {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  aspect-ratio: 1;
  position: relative;
  min-width: 620px;
  isolation: isolate;
}
.square {
  padding: 7px 2px 3px;
  min-height: 0;
  min-width: 0;
  border: 1px solid #a9b9a2;
  border-radius: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  background: #faf8ed;
  overflow: hidden;
}
.square strong {
  font-size: clamp(8px, 0.8vw, 12px);
  font-weight: 700;
  line-height: 1.1;
  overflow-wrap: anywhere;
}
.square small {
  font-size: clamp(7px, 0.65vw, 10px);
}
.square .stripe {
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.square-icon {
  font-size: 16px;
  line-height: 1;
}
.square.country .square-icon {
  display: none;
}
.buildings {
  font-size: 9px;
  line-height: 1;
}
.mortgage-badge {
  position: absolute;
  bottom: 1px;
  right: 2px;
  font-size: 9px;
  color: #a43d2d;
  font-weight: bold;
}
.board-center {
  grid-area: 2 / 2 / 11 / 11;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  background: radial-gradient(ellipse at center, #f2f2df 0%, #e3e9d3 100%);
  border: 8px solid #e9eddb;
}
.board-center h2 {
  font-family: Georgia, serif;
  font-size: clamp(3rem, 5vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-align: center;
}
.board-center p:not(.eyebrow) {
  font-size: 0.9rem;
  text-align: center;
  max-width: 32ch;
}
.board-center > small {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  margin-top: 24px;
}
.deck-cards {
  display: flex;
  gap: 28px;
  margin: 28px 0;
}
.deck-cards div {
  background: #fffdf0;
  width: 90px;
  height: 110px;
  border: 1px solid #b8c2ac;
  box-shadow: 3px 3px 0 #c5cfb8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transform: rotate(-9deg);
}
.deck-cards div:nth-child(2) {
  transform: rotate(9deg);
  background: #f1c8a5;
}
.deck-cards b {
  font-size: 0.75rem;
}
.token {
  position: absolute;
  width: 2.35%;
  height: 2.35%;
  border-radius: 50%;
  color: white;
  display: grid;
  place-items: center;
  font-size: clamp(9px, 1.05vw, 14px);
  border: 1px solid white;
  box-shadow: 0 1px 3px #0005;
  pointer-events: none;
  transition:
    left 95ms linear,
    top 95ms linear;
  z-index: 3;
}
.players-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0;
}
.players-strip > div {
  flex: 1;
  min-width: 105px;
  border-top: 4px solid;
  padding: 10px;
  background: #fffdf7;
  border-radius: 5px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.balance {
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.dice {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 4rem;
  line-height: 1;
  margin: 14px 0;
}
.rolling span {
  animation: shake 0.4s ease-out;
}
@keyframes shake {
  0% {
    transform: rotate(-15deg);
  }
  30% {
    transform: rotate(18deg) translateY(-5px);
  }
  70% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0);
  }
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.actions button {
  width: 100%;
}
.actions small {
  margin: 5px 0;
}
.owned {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.owned button {
  font-size: 0.8rem;
  text-align: left;
  border-left-width: 6px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}
.property {
  border-top: 6px solid;
}
.property dl {
  display: flex;
  gap: 16px;
  margin: 18px 0;
}
.property dt {
  font-size: 0.7rem;
  color: var(--muted);
}
.property dd {
  font-weight: 700;
  margin: 0;
}
.rent-list {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin-bottom: 14px;
}
.rent-list span {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 6px 0;
}
.asset-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.asset-actions button {
  width: 100%;
  font-size: 0.85rem;
}
.asset-actions small {
  font-size: 0.7rem;
  margin: 4px 0;
}
.log {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  max-height: 260px;
  overflow: auto;
  font-size: 0.85rem;
}
.log li {
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
}
.log li:first-child {
  font-weight: 700;
}
.trade-modal {
  width: min(640px, 95vw);
  max-height: 90dvh;
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
  color: var(--ink);
  padding: 25px;
}
.trade-modal::backdrop {
  background: #173f35aa;
}
.trade-modal .row {
  margin-bottom: 20px;
}
.trade-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 24px 0;
}
.checkbox {
  flex-direction: row;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 10px;
}
.checkbox input {
  width: 20px;
  min-height: 20px;
}
.trade-modal p {
  font-size: 0.85rem;
}
.victory {
  background: var(--ink);
  color: var(--paper);
  margin: 25px 0;
  text-align: center;
}
.victory h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
}
.victory p {
  margin: 12px auto;
}
.victory a {
  display: inline-block;
  margin: 20px;
}
.victory .eyebrow {
  color: #e1ca83;
}
@media (hover: hover) {
  button:not(:disabled):hover {
    filter: brightness(0.94);
  }
}
@media (max-width: 1050px) {
  .home,
  .room {
    padding: 24px;
  }
  .home-grid {
    gap: 35px;
    padding-top: 55px;
  }
  .game-layout {
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 16px;
  }
  .panel {
    padding: 18px;
  }
  .square strong {
    font-size: 9px;
  }
  .square small {
    font-size: 8px;
  }
}
@media (max-width: 780px) {
  .home,
  .room {
    padding: 18px 14px;
  }
  .brand span {
    display: none;
  }
  .home-grid,
  .lobby-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 0 20px;
  }
  .hero h1 {
    font-size: 4.4rem;
  }
  .hero > p:not(.eyebrow) {
    font-size: 1rem;
  }
  .entry {
    max-width: none;
    padding: 24px;
  }
  .facts {
    gap: 30px;
  }
  .game-layout {
    display: flex;
    flex-direction: column;
  }
  .game-layout > section,
  .game-layout aside {
    width: 100%;
  }
  .game-layout aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .board {
    min-width: 660px;
  }
  .room-header {
    gap: 18px;
  }
  .room-code {
    flex-wrap: wrap;
  }
  .room-header > .brand {
    width: 100%;
  }
  .lobby-grid {
    margin: 0;
  }
  .lobby h1 {
    font-size: 2.8rem;
  }
  .token {
    font-size: 11px;
  }
  .board-center h2 {
    font-size: 4rem;
  }
  .status-strip {
    font-size: 0.75rem;
    gap: 8px;
  }
  .board-scroll {
    max-height: 85dvh;
  }
  .trade-columns {
    gap: 12px;
  }
}
@media (max-width: 520px) {
  .game-layout aside {
    display: flex;
  }
  .hero h1 {
    font-size: 3.9rem;
  }
  .room-code button {
    padding: 8px;
  }
  .board-scroll {
    position: relative;
  }
  .board-scroll::after {
    content: "Desliza para explorar el tablero ↔";
    display: block;
    position: sticky;
    left: 0;
    text-align: center;
    font-size: 12px;
    background: #e3e9d3;
    padding: 7px;
    width: 100%;
  }
  .trade-columns {
    grid-template-columns: 1fr;
  }
  .passengers small {
    font-size: 0.65rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
.board-zoom {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  margin-bottom: 10px;
}
.board-zoom input {
  width: 120px;
  min-height: 32px;
  padding: 0;
  accent-color: var(--ink);
}
.board-zoom span {
  font-variant-numeric: tabular-nums;
}
:root {
  --motion-out: cubic-bezier(0.23, 1, 0.32, 1);
}
.token {
  left: 0;
  top: 0;
  transition: transform 110ms linear;
}
.activity {
  margin-bottom: 18px;
}
.shared-dice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: #fffdf7;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 18px;
}
.shared-dice .dice {
  margin: 0;
  font-size: 3rem;
}
.activity-card {
  position: fixed;
  z-index: 20;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: min(440px, calc(100vw - 28px));
  padding: 20px;
  border-radius: 14px;
  border: 2px solid var(--ink);
  background: #fff9e8;
  box-shadow: 0 8px 30px #153f3533;
  animation: activity-enter 240ms var(--motion-out);
}
.activity-card.card {
  background: #f8e4c9;
}
.activity-card.purchase {
  background: #e4efdb;
}
.activity-card p {
  font-size: 1.1rem;
}
@keyframes activity-enter {
  from {
    opacity: 0;
    transform: translate(-50%, 12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}
@keyframes log-enter {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.log-entry {
  animation: log-enter 180ms var(--motion-out);
}
.rolling span {
  animation-duration: 240ms;
  animation-timing-function: var(--motion-out);
}
.trade-trigger {
  width: 100%;
  margin: 16px 0;
}
.wallet {
  margin: 12px 0;
}
.wallet-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.wallet-summary span {
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 0.8rem;
}
.banknotes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 20px 0;
}
.banknote {
  border: 2px solid;
  padding: 12px;
  background: #fffdf5;
  border-radius: 8px;
}
.banknote strong {
  font:
    700 1.5rem Georgia,
    serif;
}
.banknote label {
  margin-top: 8px;
}
.banknote button {
  font-size: 0.75rem;
  margin-top: 6px;
}
.payment-modal form > button {
  margin: 10px 8px 0 0;
}
.players-strip details {
  margin-top: 8px;
}
.players-strip summary {
  cursor: pointer;
}
.ranking {
  list-style: none;
  margin: 20px auto;
  padding: 0;
  max-width: 600px;
}
.ranking li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #ffffff33;
}
@media (prefers-reduced-motion: reduce) {
  .activity-card,
  .log-entry,
  .rolling span {
    animation: none;
  }
  .token {
    transition: none;
  }
}
/* Rumbo Mundial: artwork and interactive surfaces drawn in CSS/SVG. */
:root { --paper:#f2f4f3; --ink:#203f59; --line:#d3dedf; --accent:#de8251; --muted:#5c727e; }
body { background-image:radial-gradient(#203f5909 1px,transparent 1px); background-size:18px 18px; }
button { transition:transform 140ms ease-out,background-color 140ms ease-out; }
button:active:not(:disabled) { transform:translateY(1px) scale(.98); }
.panel { background:#fcfdf9; box-shadow:0 3px 14px #203f5905; }
.hero { position:relative; }
.hero-globe { width:260px; height:180px; float:right; margin:-10px 0 -40px; }
.hero h1 { color:#203f59; }
.entry { box-shadow:10px 10px 0 #dae7e4; border:1px solid #bbcecb; }
.brand { letter-spacing:.06em; }
.room { max-width:1660px; }
.game-layout { grid-template-columns:minmax(0,1fr) 350px; }
.board-section { position:relative; }
.board-zoom { padding-right:155px; }
.fit-board { position:absolute; right:0; top:-5px; font-size:12px; padding:6px 10px; min-height:32px; }
.board-scroll { border:6px solid #294b61; box-shadow:0 12px 32px #203f5918; background:#294b61; }
.board { min-width:760px; gap:2px; background:#b4cbd0; }
.square { background:#fafcf7; border:1px solid #bfd2d3; padding-top:11px; gap:3px; }
.square strong { font-size:10px; line-height:1.12; }
.square small { font-size:9px; font-variant-numeric:tabular-nums; }
.square.country .square-icon { display:block; font-size:16px; }
.square .stripe { height:7px; }
.square.current-square { background:#fff3d6; outline:2px solid #de8251; outline-offset:-2px; }
.square.start,.square.rest,.square.oceania,.square.go-oceania { justify-content:center; background:#e1eeea; }
.square.go-oceania { background:#e1e4eb; }
.square.start .square-icon,.square.rest .square-icon,.square.oceania .square-icon,.square.go-oceania .square-icon { font-size:24px; }
.square.email { background:#e8edf7; }
.square.sms { background:#fff0dc; }
.square.airline { background:#edf3f6; }
.buildings { display:flex; position:absolute; bottom:2px; left:3px; gap:0; }
.building-piece { width:16px; height:16px; display:inline-block; filter:drop-shadow(0 1px 1px #0003); }
.buildings .building-piece { width:13px; height:15px; }
.property-buildings { display:flex; padding:10px 0; }
.property-buildings .building-piece { width:38px; height:38px; animation:piece-enter 200ms ease-out; }
@keyframes piece-enter { from {opacity:0;transform:translateY(-8px) scale(.8)} to {opacity:1;transform:translateY(0) scale(1)} }
.board-center { border:0; position:relative; overflow:hidden; pointer-events:auto; padding:25px; background:radial-gradient(ellipse at 50% 30%,#eef7f2,#dcece8); }
.board-center::before { content:""; position:absolute; inset:12px; border:1px solid #9fbcba; border-radius:50%; transform:rotate(-20deg) scale(1.08,.9); pointer-events:none; }
.board-center > * { position:relative; }
.board-globe { width:230px; height:150px; margin-bottom:-4px; }
.board-center h2 { font-family:Georgia,serif; font-size:clamp(3rem,4.8vw,5rem); color:#203f59; letter-spacing:-.055em; }
.board-center h2 span { color:#dc874d; font-size:.55em; display:inline-block; vertical-align:top; margin:8px; }
.board-center .eyebrow { color:#5c817b; font-size:9px; margin:0 0 14px; }
.board-center > small { margin-top:12px; color:#4f7774; }
.deck-cards { gap:32px; margin:24px 0 15px; }
.deck-cards button { width:110px; height:125px; display:flex; align-items:center; justify-content:center; flex-direction:column; border:2px solid #8b9fb6; background:repeating-linear-gradient(45deg,#dce6ef,#dce6ef 3px,#e5edf3 3px,#e5edf3 9px); box-shadow:3px 3px 0 #fcfdf9,5px 5px 0 #8b9fb6,7px 7px 0 #fcfdf9,9px 9px 0 #8b9fb6; transform:rotate(-7deg); border-radius:10px; }
.deck-cards button:nth-child(2) { transform:rotate(7deg); border-color:#bc987a; background:repeating-linear-gradient(-45deg,#f2ddbe,#f2ddbe 3px,#f9e8cd 3px,#f9e8cd 9px); box-shadow:3px 3px 0 #fcfdf9,5px 5px 0 #bc987a,7px 7px 0 #fcfdf9,9px 9px 0 #bc987a; }
.deck-cards button span { font-size:34px; line-height:1.2; }
.deck-cards button b { font-size:14px; }
.deck-cards button small { font-size:6px; letter-spacing:.1em; margin-top:5px; }
.deck-cards button[aria-pressed="true"] { transform:translateY(-8px) rotate(0); }
.board-center .deck-description { min-height:42px; font-size:12px; max-width:46ch; }
.token { border:2px solid white; box-shadow:0 2px 0 #203f5977,0 3px 6px #203f5944; }
.my-turn { border-color:#de9e64; box-shadow:0 0 0 3px #f5e5cb; }
.player-dot { display:inline-block; width:12px; height:12px; margin-right:8px; border-radius:50%; }
.player-panel h2 { overflow-wrap:anywhere; font-size:1.2rem; }
.balance { font-size:1.35rem; }
.bank-stock { margin-top:18px; padding-top:12px; border-top:1px dashed var(--line); }
.banknote { border:1px solid var(--line); padding:10px; background:#f8faf6; }
.banknote .pick-note { border:0; padding:0; display:block; width:100%; background:transparent; margin:0 0 8px; }
.note-art { display:grid; grid-template-columns:1fr auto; grid-template-rows:auto 1fr auto; width:100%; height:110px; padding:10px 14px; border:2px solid var(--note-color); outline:1px solid var(--note-color); outline-offset:-6px; border-radius:7px; text-align:left; background:repeating-radial-gradient(ellipse at 30% 50%,transparent 0 5px,#ffffff80 6px 7px),color-mix(in srgb,var(--note-color) 35%,#fffdf4); color:#283b48; position:relative; overflow:hidden; }
.note-art .note-label { font-size:8px; letter-spacing:.1em; font-weight:700; grid-column:1/3; }
.note-art .note-orbit { font-size:32px; width:50px; height:50px; border:1px solid var(--note-color); border-radius:50%; display:grid; place-items:center; align-self:center; }
.note-art strong { align-self:center; font-size:25px; font-variant-numeric:tabular-nums; font-family:Georgia,serif; }
.note-art .note-serial { grid-column:1/3; font-size:6px; letter-spacing:.16em; }
.note-art.compact { height:76px; padding:8px 12px; min-width:120px; }
.note-art.compact .note-orbit { font-size:18px; width:25px; height:25px; }
.note-art.compact strong { font-size:16px; }
.wallet summary { cursor:pointer; padding:8px 0; font-size:13px; }
.wallet-summary { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.wallet-summary > span { border:0; padding:0; text-align:right; }
.wallet-summary span span { border:0; }
.wallet-summary > span b { font-size:11px; padding:3px 7px; }
.dice { gap:10px; font-size:inherit; }
.die-face { width:48px; height:48px; flex-shrink:0; display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(3,1fr); padding:7px; gap:3px; border-radius:10px; background:#fffefa; border:1px solid #c7d0ce; box-shadow:0 4px 0 #c5d0cc,0 6px 9px #203f5915; }
.pip { border-radius:50%; background:transparent; }
.pip.visible { background:#294b61; }
.rolling .die-face { animation:dice-toss 460ms cubic-bezier(.16,1,.3,1); }
@keyframes dice-toss { 0% {transform:translateY(-15px) rotate(-40deg);opacity:.5} 55% {transform:translateY(0) rotate(8deg);opacity:1} 80% {transform:translateY(-3px) rotate(-3deg)} 100% {transform:translateY(0) rotate(0)} }
.activity-card { background:#fcfdf9; border-color:#b2c6cc; border-radius:18px; }
.activity-card.card { background:#f2f0e8; border:2px solid #c9ae86; animation:card-reveal 360ms cubic-bezier(.16,1,.3,1); }
.activity-card.purchase { background:#edf5ed; }
@keyframes card-reveal { from {opacity:0;transform:translate(-50%,25px) perspective(600px) rotateX(30deg)} to {opacity:1;transform:translate(-50%,0) perspective(600px) rotateX(0)} }
.detention { border:1px solid #cad0dc; border-radius:10px; padding:12px; margin:12px 0; background:#eceff3; }
.detention p { font-size:12px; }
.detention-steps { display:flex; gap:6px; }
.detention-steps span { background:#dbe6de; width:30px; height:28px; display:grid; place-items:center; border-radius:4px; }
.detention-steps .pending { background:#bdc8d5; }
.auction-box { background:#f9efd9; padding:15px; border-radius:12px; border:1px solid #dbc39a; }
.auction-box label,.auction-box button { margin-top:10px; }
.status-strip { padding:12px 16px; border-radius:10px; background:#203f59; color:#fff; }
.property dl { flex-wrap:wrap; }
.property .rent-list b { font-variant-numeric:tabular-nums; }
.property-dialog { width:min(430px,94vw); max-height:90dvh; padding:0; border:0; border-radius:16px; background:#fcfdf9; color:var(--ink); }
.property-dialog::backdrop { background:#102e4699; }
.property-dialog > button { float:right; margin:12px; }
.property-dialog .property { border:0; border-top:8px solid; }
@media (hover:hover) {
  .square:hover { z-index:4; background:#fff5dc; outline:2px solid #de8251; outline-offset:-2px; }
  .deck-cards button:hover { transform:translateY(-5px) rotate(-3deg); }
  .deck-cards button:nth-child(2):hover { transform:translateY(-5px) rotate(3deg); }
  .pick-note:hover { transform:translateY(-3px); }
}
@media(max-width:1100px) { .game-layout {grid-template-columns:minmax(0,1fr) 300px;} .room {padding:20px;} }
@media(max-width:780px) {
  .room {padding:16px 10px;} .hero-globe {width:180px;height:125px;margin:0 0 -20px;}
  .game-layout {display:flex;} .game-layout aside {display:flex;}
  .board {min-width:760px;} .board-center h2 {font-size:54px;} .square strong {font-size:10px;}
  .board-scroll {max-height:80dvh; border-width:3px;} .shared-dice {padding:12px;}
  .shared-dice strong {font-size:13px;} .shared-dice small {font-size:11px;}
  .die-face {width:42px;height:42px;}
  .board-zoom {font-size:11px;gap:5px;padding-right:135px;} .board-zoom input {width:85px;}
  .fit-board {font-size:10px;}
  .banknotes {gap:8px;} .banknote {padding:6px;} .note-art {padding:9px;height:95px;}
  .note-art strong {font-size:21px;} .note-art .note-orbit {font-size:22px;width:35px;height:35px;}
}
@media(prefers-reduced-motion:reduce) { .rolling .die-face,.activity-card.card,.property-buildings .building-piece {animation:none;} button {transition:none;} }
.square.country { gap:2px; padding-top:10px; padding-bottom:2px; }
.square.country .square-icon { font-size:14px; }
.square.country strong { font-size:9px; line-height:1.1; }
.square.country small { line-height:1.1; }
.wallet-summary .note-art { border:2px solid var(--note-color); }
.board-globe { height:120px; width:200px; }
.board-center .deck-cards { margin:18px 0 12px; }
.board-center .deck-description { font-size:11px; }
/* Escenas compartidas, fuera del formato de tarjetas. */
.table-scene { position:fixed; inset:0; z-index:80; display:grid; place-items:center; padding:30px; background:#102d477a; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
.scene-content { width:min(920px,95vw); text-align:center; color:white; display:flex; flex-direction:column; align-items:center; animation:scene-arrival 550ms cubic-bezier(.16,1,.3,1); }
.scene-content h2 { font-family:Georgia,serif; font-size:clamp(24px,4vw,48px); max-width:30ch; text-shadow:0 3px 20px #102d4766; line-height:1.18; }
.scene-content .eyebrow { color:#ffe3aa; font-size:13px; }
.scene-content button { margin-top:28px; min-width:150px; background:#fff9e8; }
.scene-content .dice { margin:50px 0; gap:35px; perspective:800px; }
.scene-content .die-face { width:115px;height:115px; border-radius:23px; padding:19px; gap:10px; box-shadow:0 12px 0 #becbd0,0 30px 50px #0004; }
.scene-content .rolling .die-face { animation:cinematic-dice 1300ms cubic-bezier(.16,1,.3,1); }
.scene-content .rolling .die-face:nth-child(2) { animation-delay:100ms; }
.scene-envelope { font-size:150px; color:#ffe4b1; line-height:1.2; margin:25px; animation:envelope-open 650ms cubic-bezier(.16,1,.3,1); }
.scene-globe { width:300px;height:200px; }
.scene-flag { font-size:70px; margin-top:-35px; }
.scene-building .building-piece { width:150px;height:150px; margin:30px; animation:building-rise 700ms cubic-bezier(.16,1,.3,1); }
@keyframes cinematic-dice { 0% {opacity:0;transform:translateY(-180px) rotateX(480deg) rotateZ(-130deg) scale(.5)} 65% {opacity:1;transform:translateY(15px) rotateX(0) rotateZ(12deg) scale(1.08)} 82% {transform:translateY(-22px) rotateZ(-7deg)} 100% {transform:translateY(0) rotateZ(0)} }
@keyframes scene-arrival { from {opacity:0;transform:translateY(35px) scale(.85)} to {opacity:1;transform:translateY(0) scale(1)} }
@keyframes envelope-open { from {opacity:0;transform:rotateY(90deg) translateY(50px) scale(.5)} to {opacity:1;transform:rotateY(0) translateY(0) scale(1)} }
@keyframes building-rise { from {opacity:0;transform:translateY(100px) scale(.2)} to {opacity:1;transform:translateY(0) scale(1)} }
.buy-scene { position:fixed; z-index:65; top:50%;left:50%;transform:translate(-50%,-50%); width:min(520px,90vw); padding:35px; background:#f7f3e6; border-radius:28px; box-shadow:0 0 0 100vmax #102d4777,0 20px 80px #0005; text-align:center; }
.buy-scene::before,.trade-scene::before {content:"";position:fixed;inset:-100vh -100vw;backdrop-filter:blur(8px);z-index:-1;pointer-events:none;}
.scene-country span {font-size:75px;display:block;}
.scene-country h2 {font:700 38px Georgia,serif;}
.buy-scene button {margin-top:12px;}
.trade-scene {position:fixed;z-index:66;top:50%;left:50%;transform:translate(-50%,-50%);width:min(560px,90vw);box-shadow:0 0 0 100vmax #102d4777; padding:35px;}
.wallet {position:fixed;z-index:40;bottom:0;left:50%;transform:translateX(-50%);width:min(850px,98vw);margin:0;padding:5px 15px 0;background:linear-gradient(transparent,#163b55e6 35%);color:white;}
.wallet summary {text-align:center;color:white;text-shadow:0 1px 4px #000;}
.wallet-summary {display:flex;justify-content:center;gap:0;overflow-x:auto; padding:15px 12px 0;margin-top:0;}
.wallet-summary > span {flex:0 0 125px;margin-left:-25px;position:relative;transition:transform 200ms;transform:rotate(-5deg);}
.wallet-summary > span:nth-child(even) {transform:rotate(5deg);}
.wallet-summary > span:first-child {margin-left:0;}
.wallet-summary > span:hover {transform:translateY(-14px) rotate(0);z-index:2;}
.wallet-summary > span > b {background:#183a50;border-radius:15px;color:white;position:absolute;right:5px;top:-8px;}
.room {padding-bottom:150px;}
.payment-modal {width:min(1000px,96vw);background:#f7f3e8;}
.payment-modal::backdrop,.trade-modal::backdrop,.property-dialog::backdrop {background:#102d4788;backdrop-filter:blur(12px);}
.payment-modal .banknotes {display:flex;overflow-x:auto;gap:12px;padding:20px 8px;align-items:end;}
.payment-modal .banknote {flex:0 0 180px;background:transparent;border:0;}
.payment-modal .pick-note:hover {transform:translateY(-12px) rotate(-3deg);}
.payment-modal .note-art {height:125px;}
@media(max-width:600px){.scene-content .die-face{width:85px;height:85px;padding:14px;gap:7px}.scene-globe{width:220px;height:150px}.scene-envelope{font-size:110px}.wallet-summary > span{flex-basis:110px;margin-left:-30px}.wallet .note-art strong{font-size:14px}.buy-scene{padding:22px}.scene-content h2{font-size:26px}.payment-modal .banknote{flex-basis:160px}}
@media(prefers-reduced-motion:reduce){.scene-content,.scene-envelope,.scene-building .building-piece,.scene-content .rolling .die-face{animation:none}.wallet-summary > span{transition:none}}
.country-art {display:block;width:100%;height:auto;border-radius:8px;}
.square.country .square-icon {width:100%;height:22px;flex-shrink:0;}
.square .country-art {height:22px;width:100%;border-radius:0;}
.property > .country-art {max-height:170px;margin:0 0 18px;}
.scene-country > .country-art {max-height:190px;}
.scene-country > span {font-size:30px;margin-top:-25px;position:relative;}
/* Mesa ajustada a la ventana: navegación mediante paneles flotantes. */
.table-viewport {height:100dvh;max-width:none;overflow:hidden;display:flex;flex-direction:column;padding:12px 18px 0;gap:8px;}
.table-viewport .room-header {flex-shrink:0;padding:0;gap:10px;min-height:42px;}
.table-viewport .room-header button {min-height:34px;padding:6px 10px;}
.table-viewport .room-header .brand {font-size:13px;width:auto;}
.table-viewport .room-code {gap:6px;}
.table-viewport .room-code b {font-size:16px;}
.table-viewport > footer {display:none;}
.table-viewport > .notice,.table-viewport > .error {position:fixed;top:65px;left:50%;transform:translateX(-50%);z-index:95;max-width:90vw;margin:0;}
.table-viewport .status-strip {margin:0;padding:7px 12px;min-height:32px;flex-shrink:0;}
.table-viewport .activity {position:absolute;right:24px;top:112px;z-index:5;margin:0;}
.table-viewport .shared-dice {padding:7px 10px;max-width:210px;font-size:10px;gap:8px;}
.table-viewport .shared-dice .die-face {width:25px;height:25px;padding:4px;gap:2px;border-radius:5px;box-shadow:0 2px 0 #c5d0cc;}
.table-tools {display:flex;gap:8px;flex-shrink:0;z-index:10;}
.table-tools button {font-size:12px;min-height:34px;padding:6px 12px;}
.table-tools button[aria-expanded="true"] {background:var(--ink);color:white;}
.table-viewport .game-layout {display:block;position:relative;flex:1;min-height:0;width:100%;padding:0 0 110px;}
.table-viewport .game-layout > section {height:100%;width:100%;min-height:0;}
.table-viewport .board-section {height:100%;display:flex;flex-direction:column;align-items:center;min-height:0;padding-top:0;}
.table-viewport .board-zoom,.table-viewport .fit-board {display:none;}
.table-viewport .board-scroll {flex:1;min-height:0;width:100%;border:0;box-shadow:none;background:transparent;border-radius:0;overflow:hidden;display:flex;align-items:center;justify-content:center;max-height:none;}
.table-viewport .board-scroll::after {display:none;}
.table-viewport .board {width:760px;height:760px;min-width:760px;flex-shrink:0;aspect-ratio:1;border:5px solid #294b61;border-radius:9px;box-sizing:content-box;}
.table-viewport .game-layout aside,.table-viewport .players-strip {position:fixed;top:150px;bottom:122px;width:min(340px,calc(100vw - 24px));z-index:45;display:none;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;background:#f8faf6;border:1px solid #b8cccc;border-radius:18px;box-shadow:0 14px 60px #17394a44;padding:12px;margin:0;}
.table-viewport .game-layout aside {right:12px;}
.table-viewport .players-strip {left:12px;}
.table-viewport.side-open .game-layout aside {display:flex;flex-direction:column;gap:12px;}
.table-viewport.roster-open .players-strip {display:flex;flex-direction:column;gap:12px;}
.table-viewport .players-strip > div {flex:0 0 auto;}
.table-viewport .player-panel {border:0;box-shadow:none;padding:6px;}
.panel-close {align-self:flex-end;font-size:12px;min-height:32px;padding:5px 10px;flex-shrink:0;}
.table-viewport .player-panel .wallet {display:block;position:fixed;bottom:0;left:50%;}
.table-viewport .game-layout aside:not(:is(.side-open aside)) .wallet {display:block;}
.table-viewport .wallet-summary {padding-top:10px;}
.table-viewport .wallet .note-art.compact {height:66px;}
.table-viewport .wallet {width:min(850px,98vw);}
.table-viewport .wallet summary {padding:4px;font-size:11px;}
.table-viewport .victory {position:fixed;z-index:60;inset:15% 10% auto;max-height:75dvh;overflow:auto;}
.table-viewport .trade-scene {display:block;}
@media(min-width:1200px){
 .table-viewport .game-layout {padding-right:350px;}
 .table-viewport .game-layout aside {display:flex;flex-direction:column;}
 .table-viewport .game-layout aside > .panel-close {display:none;}
 .table-viewport .activity {right:380px;}
 .table-viewport .wallet {left:calc((100vw - 350px)/2);width:min(750px,calc(100vw - 380px));}
}
@media(max-width:700px){
 .table-viewport {padding:8px 7px 0;gap:5px;}
 .table-viewport .room-header {flex-wrap:wrap;gap:5px;min-height:60px;}
 .table-viewport .room-header .brand {font-size:11px;letter-spacing:0;}
 .table-viewport .room-header > button {margin-left:auto;font-size:10px;}
 .table-viewport .room-code {order:3;width:100%;justify-content:center;}
 .table-viewport .room-code button {font-size:10px;}
 .table-viewport .status-strip {font-size:10px;gap:5px;}
 .table-viewport .activity {top:146px;right:10px;pointer-events:none;}
 .table-viewport .activity .table-scene {pointer-events:auto;}
 .table-viewport .shared-dice {background:#fcfdf9dd;max-width:110px;}
 .table-viewport .shared-dice > strong {display:none;}
 .table-tools button {font-size:10px;padding:5px 8px;}
 .table-viewport .game-layout {padding-bottom:92px;}
 .table-viewport .game-layout aside,.table-viewport .players-strip {top:155px;bottom:100px;}
 .table-viewport .wallet .note-art.compact {height:60px;}
}
@media(max-height:500px) and (orientation:landscape){
 .table-viewport .room-header {min-height:30px;flex-wrap:nowrap;}
 .table-viewport .room-code {order:0;width:auto;}
 .table-viewport .status-strip {min-height:24px;padding:3px 8px;}
 .table-tools {position:fixed;left:8px;top:85px;flex-direction:column;max-width:125px;}
 .table-viewport .game-layout {padding-bottom:65px;}
 .table-viewport .activity {top:85px;right:8px;}
 .table-viewport .game-layout aside,.table-viewport .players-strip {top:80px;bottom:75px;}
 .table-viewport .wallet summary {display:none;}
 .table-viewport .wallet .note-art.compact {height:48px;}
 .table-viewport .wallet .note-label,.table-viewport .wallet .note-serial {display:none;}
 .table-viewport .wallet-summary {padding-top:8px;}
}
.player-tabs {margin:12px 0;flex-shrink:0;}
.player-tabs button {font-size:12px;min-height:34px;padding:6px;}
.table-viewport .owned button {min-height:36px;padding:7px 10px;}
.table-viewport .player-panel [hidden] {display:none!important;}
@media(max-height:500px) and (orientation:landscape){.table-viewport .game-layout aside,.table-viewport .players-strip{top:8px;bottom:8px;z-index:55}.table-viewport .player-panel .balance{font-size:18px}.table-viewport .player-panel h3{margin:8px 0}.table-viewport .bank-stock{margin-top:6px;padding-top:6px}}
/* Arte raster original: cada país tiene su propia ilustración. */
.board-center {padding:0;display:block;}
.board-center .world-board-art {position:absolute!important;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;}
.board-center::before {display:none;}
.board-center .continent-labels {position:absolute;inset:0;pointer-events:none;z-index:1;}
.continent-labels span {position:absolute;transform:translate(-50%,-50%);font-size:12px;font-weight:800;color:#16394b;text-shadow:0 1px 3px #fff,0 0 8px #fff;background:#fff5d5cc;padding:3px 8px;border-radius:20px;white-space:nowrap;}
.region-north {left:22%;top:25%;}.region-central {left:23%;top:46%;}.region-south {left:32%;top:64%;}.region-europe {left:52%;top:23%;}.region-africa {left:51%;top:49%;}.region-asia {left:76%;top:32%;}.region-oceania {left:82%;top:74%;}
.board-center .world-board-title {position:absolute;top:3%;left:50%;transform:translateX(-50%);width:max-content;font-size:28px;line-height:1;color:#173e50;background:#fff5dfdf;padding:10px 20px;border-radius:40px;box-shadow:0 4px 15px #123b4520;}
.board-center .deck-cards {position:absolute;bottom:8%;left:50%;transform:translateX(-50%);gap:18px;margin:0;z-index:2;}
.board-center .deck-cards button {width:75px;height:87px;box-shadow:2px 2px #fff,4px 4px #8b9fb6;}
.board-center .deck-cards button span {font-size:25px;}.board-center .deck-cards button b {font-size:12px;}.board-center .deck-cards button small {display:none;}
.board-center > small {position:absolute;bottom:1%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#fff8e5cc;padding:3px 10px;border-radius:10px;margin:0;}
.board-center .deck-description {position:absolute;left:8%;right:8%;bottom:29%;margin:0;max-width:none;min-height:0;padding:8px 12px;border-radius:10px;background:#fff8e8ef;color:#203f59;box-shadow:0 3px 12px #16394b33;z-index:3;}
.board-center .deck-description:empty {display:none;}
.square.country {padding:7px 0 0;gap:0;}
.square.country .square-icon {position:absolute;inset:7px 0 0;height:auto;width:100%;}
.square .country-art {width:100%;height:100%;object-fit:cover;border-radius:0;}
.square.country strong {position:relative;margin-top:auto;width:100%;font-size:9px;line-height:1.1;background:#fffdf3ed;padding:2px 1px 0;color:#153c50;}
.square.country small {position:relative;background:#fffdf3ed;width:100%;font-size:8px;padding-bottom:2px;color:#153c50;}
.square .stripe,.square .buildings {z-index:2;}
.square .buildings {bottom:auto;top:10px;background:#ffffffb8;border-radius:3px;}
.property > .country-art {width:100%;height:auto;max-height:none;aspect-ratio:3/2;object-fit:cover;border-radius:12px;}
.scene-country > .country-art {width:100%;max-height:240px;object-fit:cover;}
.region-central {left:20%;top:40%;}.region-south {left:24%;top:62%;}.region-oceania {left:83%;top:65%;}
````

## app/layout.tsx

````tsx
import type { Metadata } from "next";
import { indexable, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: "%s | Rumbo Mundial" },
  description: siteDescription,
  applicationName: "Rumbo Mundial",
  robots: { index: indexable, follow: indexable },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Rumbo Mundial",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/art/world-center.webp", alt: "Mapa ilustrado de Rumbo Mundial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/art/world-center.webp"],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
````

## app/page.tsx

````tsx
import type { Metadata } from "next";
import { Globe } from "@/components/TravelArt";
import EntryForm from "@/components/EntryForm";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Rumbo Mundial",
            url: siteUrl.href,
            inLanguage: "es-MX",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <header className="brand">
        ✈ RUMBO MUNDIAL <span>EDICIÓN ENTRE AMIGOS</span>
      </header>
      <div className="home-grid">
        <section className="hero">
          <p className="eyebrow">PASE DE ABORDAR / SIN SALIR DE CASA</p>
          <h1 className="home-title">
            Turista mundial
            <br />
            online<span>.</span>
          </h1>
          <p>
            Juega con tus amigos en Rumbo Mundial, un juego de mesa multijugador
            para 2 a 6 personas. Compra países, construye casas y hoteles y negocia
            desde tu celular o computadora, sin descargar nada.
          </p>
          <Globe className="hero-globe" />
          <div className="route-art" aria-hidden="true">
            <span>MEX</span>
            <i>✈</i>
            <span>EL MUNDO</span>
          </div>
          <div className="facts">
            <div>
              <b>40</b>
              <small>destinos y sorpresas</small>
            </div>
            <div>
              <b>2–6</b>
              <small>viajeros por sala</small>
            </div>
            <div>
              <b>∞</b>
              <small>ganas de revancha</small>
            </div>
          </div>
        </section>
        <EntryForm />
      </div>
      <section className="home-help" aria-label="Cómo jugar con amigos">
        <details>
          <summary>¿Cómo jugar turista mundial online con amigos?</summary>
          <p>
            Crea una sala con tu nombre y color de ficha, y comparte el ID o el
            enlace. Tus amigos pueden entrar desde su navegador. Cuando haya de
            2 a 6 jugadores, el anfitrión inicia la partida. El banco automático
            administra compras, rentas y pagos.
          </p>
        </details>
        <details>
          <summary>¿Necesito una cuenta o instalar una aplicación?</summary>
          <p>
            No necesitas registrarte ni instalar una aplicación. Solo una conexión
            a internet y un navegador en tu celular, tableta o computadora. Puedes
            refrescar la página y recuperar tu lugar desde el mismo navegador,
            mientras conserves sus datos y la sala siga disponible.
          </p>
        </details>
        <details>
          <summary>¿Es la versión oficial de Fotorama?</summary>
          <p>
            No. Rumbo Mundial es una adaptación independiente con ilustraciones y
            textos propios; no está afiliada a Fotorama. Incluye países, aerolíneas,
            casas, hoteles, cartas E-Mail y SMS, subastas y tratos entre jugadores.
          </p>
        </details>
      </section>
      <footer>
        Rumbo Mundial · Un viaje entre amigos. Ilustraciones y textos originales.
      </footer>
    </main>
  );
}
````

## app/robots.ts

````typescript
import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(indexable ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
````

## app/sala/[id]/page.tsx

````tsx
import type { Metadata } from "next";
import Room from "@/components/Room";
export const metadata: Metadata = {
  title: "Sala de juego",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <Room id={(await params).id.toUpperCase()} />;
}
````

## app/sitemap.ts

````typescript
import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable ? [{ url: siteUrl.href }] : [];
}
````

## components/Activity.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import type { Game, GameEvent } from "@/lib/game/types";
import Dice from "./Dice";
import { Globe, Building } from "./TravelArt";
import { BOARD } from "@/lib/game/board";
export default function Activity({ game }: { game: Game }) {
  const [queue,setQueue]=useState<GameEvent[]>([]);
  const seen=useRef(game.eventSerial??0);
  useEffect(()=>{
    const fresh=(game.events??[]).filter((e)=>e.id>seen.current && e.type!=="move");
    seen.current=game.eventSerial??0;
    if(fresh.length)setQueue((q)=>[...q,...fresh]);
  },[game.events,game.eventSerial]);
  const event=queue[0];
  useEffect(()=>{
    if(!event)return;
    const timer=setTimeout(()=>setQueue((q)=>q.slice(1)),event.type==="card"?6500:event.type==="roll"?2600:3400);
    return()=>clearTimeout(timer);
  },[event]);
  const lastRoll=[...(game.events??[])].reverse().find((e)=>e.type==="roll");
  const property=event?.square===undefined?null:BOARD[event.square];
  return <section className="activity" aria-label="Actividad compartida">
    <div className="shared-dice"><strong>{lastRoll?.text??"Preparando el despegue"}</strong><Dice values={lastRoll?.dice??game.dice}/></div>
    {event&&<div className="table-scene" key={event.id} role="status" aria-live="polite">
      <div className={`scene-content scene-${event.type}`}>
        <span className="eyebrow">{event.type==="roll"?"LOS DADOS DECIDEN":event.type==="card"?event.deck==="email"?"CORREO RECIBIDO":"NUEVO MENSAJE":event.type==="purchase"?"NUEVA PROPIEDAD":"EN NUESTRA MESA"}</span>
        {event.dice?<Dice values={event.dice} rollId={event.id}/>:event.type==="card"?<div className="scene-envelope" aria-hidden="true">{event.deck==="email"?"✉":"☏"}</div>:event.text.includes("construyó")?<div className="scene-building"><Building hotel={Object.values(game.properties).some((p)=>p.buildings===5)}/></div>:<Globe className="scene-globe"/>}
        {property&&<div className="scene-flag">{property.flag??"✈"}</div>}
        <h2>{event.text}</h2>
        <button onClick={()=>setQueue((q)=>q.slice(1))}>Continuar{queue.length>1?` · ${queue.length-1} acontecimientos`:""}</button>
      </div>
    </div>}
  </section>;
}
````

## components/Board.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building, CountryArt } from "./TravelArt";
import { BOARD, cash } from "@/lib/game/board";
import type { Game, GameEvent } from "@/lib/game/types";
export function coordinates(id: number): [number, number] {
  if (id <= 10) return [0, id];
  if (id <= 20) return [id - 10, 10];
  if (id <= 30) return [10, 30 - id];
  return [40 - id, 0];
}
export default function Board({
  game,
  onSelect,
}: {
  game: Game;
  onSelect: (id: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [deckInfo, setDeckInfo] = useState<"email" | "sms" | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const fit = () => {
    const container = scroll.current;
    if (!container) return;
    const available = Math.min(container.clientWidth - 8, container.clientHeight - 8);
    if (available > 0) setZoom(available / 760);
  };
  useEffect(() => {
    const container = scroll.current;
    if (!container) return;
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    fit();
    return () => observer.disconnect();
  }, []);
  const [positions, setPositions] = useState<Record<string, number>>(() =>
    Object.fromEntries(game.players.map((p) => [p.id, p.position])),
  );
  const seen = useRef(game.eventSerial ?? 0);
  const queue = useRef<GameEvent[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(game.players);
  latest.current = game.players;
  useEffect(() => {
    const events = game.events ?? [];
    const moves = events.filter(
      (e) =>
        e.id > seen.current && e.type === "move" && e.player && e.path?.length,
    );
    const gap =
      events.length > 0 && seen.current > 0 && events[0].id > seen.current + 1;
    seen.current = game.eventSerial ?? 0;
    const snapshot = () =>
      Object.fromEntries(latest.current.map((p) => [p.id, p.position]));
    if (gap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      queue.current = [];
      setPositions(snapshot());
      return;
    }
    queue.current.push(...moves);
    if (timer.current) return;
    const play = () => {
      const move = queue.current.shift();
      if (!move?.player || !move.path) {
        timer.current = null;
        setPositions(snapshot());
        return;
      }
      const player = move.player,
        path = move.path;
      let step = 0;
      if (move.from !== undefined)
        setPositions((p) => ({ ...p, [player]: move.from! }));
      const advance = () => {
        const destination=path[step];
        setPositions((p) => ({ ...p, [player]: destination }));
        step++;
        timer.current = setTimeout(step < path.length ? advance : play, 110);
      };
      timer.current = setTimeout(advance, move.teleport ? 0 : 110);
    };
    play();
  }, [game.events, game.eventSerial, game.players]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const icons: Record<string, string> = {
    start: "⚑",
    oceania: "↩",
    rest: "🏝",
    "go-oceania": "▥",
    email: "✉",
    sms: "☏",
    tax: "$",
    airline: "✈",
    utility: "⚖",
  };
  return (
    <section className="board-section">
      <label className="board-zoom">
        Escala del tablero
        <input
          aria-label="Escala del tablero"
          type="range"
          min="0.35"
          max="1.25"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <span>{Math.round(zoom * 100)}%</span>
      </label>
      <button className="fit-board" onClick={fit}>Ver tablero completo</button>
      <div className="board-scroll" ref={scroll}>
        <div
          className="board"
          style={{ zoom }}
          aria-label="Tablero de 40 casillas"
        >
          {BOARD.map((b) => {
            const [x, y] = coordinates(b.id),
              a = game.properties[b.id],
              owner = game.players.find((p) => p.id === a?.owner);
            return (
              <button
                key={b.id}
                onClick={() => onSelect(b.id)}
                className={`square ${b.kind} ${game.players[game.turn]?.position === b.id ? "current-square" : ""}`}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  borderColor: owner?.color,
                  boxShadow: owner ? `inset 0 -4px ${owner.color}` : undefined,
                }}
                aria-label={`${b.name}${a?.owner ? `, de ${owner?.name}` : ""}${a?.mortgaged ? ", hipotecada" : ""}`}
              >
                <span
                  className="stripe"
                  style={{ background: b.color ?? "transparent" }}
                />
                <span className="square-icon">{b.kind === "country" ? <CountryArt id={b.id} /> : icons[b.kind]}</span>
                <strong>{b.name}</strong>
                <small>
                  {b.price ? cash(b.price) : b.tax ? cash(b.tax) : ""}
                </small>
                {a?.buildings ? (
                  <span className="buildings">
                    {a.buildings === 5 ? <Building hotel /> : Array.from({ length: a.buildings }, (_, i) => <Building key={i} />)}
                  </span>
                ) : null}
                {a?.mortgaged && <span className="mortgage-badge">H</span>}
              </button>
            );
          })}
          <div className="board-center">
            <Image className="world-board-art" src="/art/world-center.webp" alt="Mapa ilustrado de los continentes con monumentos y rutas de viaje" fill sizes="(max-width: 780px) 90vw, 650px" priority />
            <div className="continent-labels" aria-label="Regiones del mundo">
              <span className="region-north">Norteamérica</span><span className="region-central">Centroamérica</span><span className="region-south">Sudamérica</span><span className="region-europe">Europa</span><span className="region-africa">África</span><span className="region-asia">Asia</span><span className="region-oceania">Oceanía</span>
            </div>
            <h2 className="world-board-title">Rumbo Mundial ✦</h2>
            <div className="deck-cards">
              <button onClick={() => setDeckInfo(deckInfo === "email" ? null : "email")} aria-pressed={deckInfo === "email"}>
                <span aria-hidden="true">✉</span><b>Correo</b><small>EL MUNDO TE ESCRIBE</small>
              </button>
              <button onClick={() => setDeckInfo(deckInfo === "sms" ? null : "sms")} aria-pressed={deckInfo === "sms"}>
                <span aria-hidden="true">☏</span><b>Mensaje</b><small>UN NUEVO DESTINO</small>
              </button>
            </div>
            <p className="deck-description">{deckInfo ? `El mazo de ${deckInfo === "email" ? "Correo" : "Mensaje"} se baraja en cada partida. La carta se revela al caer en su casilla y vuelve al fondo, salvo los permisos que conserves.` : ""}</p>
            <small>SALIDA ↓ MARRUECOS · SUELDO $20,000</small>
          </div>
          {game.players
            .filter((p) => !p.bankrupt)
            .map((p, i) => {
              const pos = positions[p.id] ?? p.position;
              const [x, y] = coordinates(pos);
              return (
                <span
                  key={p.id}
                  className="token"
                  title={p.name}
                  aria-label={`${p.name} en ${BOARD[pos].name}`}
                  style={{
                    transform: `translate(${((x + 0.18 + (i % 3) * 0.27) * 10000) / (11 * 2.35)}%, ${((y + 0.57 + Math.floor(i / 3) * 0.2) * 10000) / (11 * 2.35)}%)`,
                    background: p.color,
                  }}
                >
                  ✈
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}
````

## components/Dice.tsx

````tsx
const positions: Record<number, number[]> = {1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
export default function Dice({ values, rollId = 0 }: { values: [number, number]; rollId?: number }) {
  return <div className={`dice ${rollId ? "rolling" : ""}`} key={rollId} aria-label={`Dados: ${values.filter(Boolean).join(" y ")}`}>
    {values.filter(Boolean).map((value,i) => <span className="die-face" key={i} aria-hidden="true">{Array.from({length:9},(_,dot) => <i key={dot} className={positions[value]?.includes(dot) ? "pip visible" : "pip"}/>)}</span>)}
  </div>;
}
````

## components/EntryForm.tsx

````tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/game/types";
export default function EntryForm({ room }: { room?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "join">(room ? "join" : "create");
  const [name, setName] = useState("");
  const [id, setId] = useState(room ?? "");
  const [color, setColor] = useState(COLORS[0]);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const roomId = id.trim().toUpperCase();
      const res = await fetch(
        mode === "create" ? "/api/rooms" : `/api/rooms/${roomId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            ...(mode === "create"
              ? { color, duration }
              : {
                  token: localStorage.getItem(`turista:${roomId}`) ?? undefined,
                }),
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const target = data.id ?? roomId;
      localStorage.setItem(`turista:${target}`, data.playerToken);
      if (room) window.location.reload();
      else router.push(`/sala/${target}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo conectar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="entry panel">
      {!room && (
        <div className="tabs">
          <button
            type="button"
            aria-pressed={mode === "create"}
            onClick={() => setMode("create")}
          >
            Crear sala
          </button>
          <button
            type="button"
            aria-pressed={mode === "join"}
            onClick={() => setMode("join")}
          >
            Unirse a sala
          </button>
        </div>
      )}
      <h2>
        {mode === "create" ? "Tu próxima gran aventura" : "Tu lugar en la mesa"}
      </h2>
      <label>
        Tu nombre
        <input
          required
          maxLength={24}
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo te llamas?"
        />
      </label>
      {mode === "join" ? (
        <label>
          ID de sala
          <input
            required
            pattern="[A-HJ-NP-Z2-9]{6}"
            maxLength={6}
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            placeholder="ABC234"
          />
        </label>
      ) : (
        <>
          <fieldset>
            <legend>Elige tu avión</legend>
            <div className="colors">
              {COLORS.map((c, i) => (
                <button
                  type="button"
                  key={c}
                  style={{ background: c }}
                  aria-label={`Color ${i + 1}`}
                  aria-pressed={color === c}
                  onClick={() => setColor(c)}
                >
                  ✈
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Duración
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={0}>Hasta el último viajero</option>
              {[30, 60, 90].map((n) => (
                <option key={n} value={n}>
                  {n} minutos
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button className="primary" disabled={busy}>
        {busy
          ? "Preparando el viaje…"
          : mode === "create"
            ? "Crear mi sala ↗"
            : "Entrar a la sala ↗"}
      </button>
      <small>De 2 a 6 amigos. Una sala, todo el mundo.</small>
    </form>
  );
}
````

## components/Log.tsx

````tsx
import type { GameEvent } from "@/lib/game/types";
export default function Log({
  events,
  history = [],
}: {
  events: string[];
  history?: GameEvent[];
}) {
  const entries = history.length
    ? history.map((e) => ({ id: String(e.id), text: e.text }))
    : events.map((text, i) => ({ id: `legacy-${i}`, text }));
  return (
    <section className="panel">
      <h2>Bitácora de viaje</h2>
      <ol className="log" aria-live="polite" aria-relevant="additions">
        {entries
          .slice(-50)
          .reverse()
          .map((event) => (
            <li className="log-entry" key={event.id}>
              {event.text}
            </li>
          ))}
      </ol>
    </section>
  );
}
````

## components/PaymentModal.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Banknote } from "./TravelArt";
import { DENOMINATIONS, totalBills, wallet } from "@/lib/game/money";
import type { Action, Player } from "@/lib/game/types";
export default function PaymentModal({
  player,
  amount,
  label,
  action,
  onClose,
  commit,
  error,
}: {
  player: Player;
  amount: number;
  label: string;
  action: Action;
  error?: string;
  onClose: () => void;
  commit: (a: Action) => Promise<boolean>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const held = wallet(player);
  const total = totalBills(selected);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      className="trade-modal payment-modal"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          if (await commit({ ...action, bills: selected })) onClose();
          setBusy(false);
        }}
      >
        <div className="row">
          <h2>Selecciona tus billetes</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar pago">
            ×
          </button>
        </div>
        <p>{label}</p>
        {error && <p className="error" role="alert">{error}</p>}
        <p className="balance">Por pagar: ${amount.toLocaleString("es-MX")}</p>
        <small>
          Tu saldo: ${player.money.toLocaleString("es-MX")}. El Banco entrega el
          cambio automáticamente.
        </small>
        <div className="banknotes">
          {DENOMINATIONS.filter((value) => held[value]).map((value) => (
            <div
              key={value}
              className="banknote"
            >
              <button type="button" className="pick-note" disabled={busy || (selected[value] ?? 0) >= (held[value] ?? 0)} aria-label={`Añadir billete de $${value}`} onClick={() => setSelected({...selected, [value]: Math.min(held[value] ?? 0, (selected[value] ?? 0) + 1)})}><Banknote value={value} /></button>
              <small>Tienes {held[value] ?? 0}</small>
              <label>
                Cantidad
                <input
                  type="number"
                  disabled={busy}
                  min="0"
                  max={held[value] ?? 0}
                  value={selected[value] ?? 0}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      [value]: Number(e.target.value),
                    })
                  }
                />
              </label>
              {value > 1 && (
                <button
                  type="button"
                  disabled={busy || !held[value]}
                  onClick={async () => {
                    setBusy(true);
                    if (await commit({ type: "change", denomination: value }))
                      setSelected({});
                    setBusy(false);
                  }}
                >
                  Cambiar billete
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="row">
          <span>Entregas: ${total.toLocaleString("es-MX")}</span>
          <span>Cambio: ${Math.max(0, total - amount)}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            let remaining = amount;
            const next: Record<string, number> = {};
            for (const value of DENOMINATIONS) {
              next[value] = Math.min(
                held[value] ?? 0,
                Math.ceil(Math.max(0, remaining) / value),
              );
              remaining -= next[value] * value;
            }
            setSelected(next);
          }}
        >
          Seleccionar por mí
        </button>
        <button
          className="primary"
          disabled={busy || total < amount || player.money < amount}
        >
          {busy ? "Procesando…" : `Pagar $${amount}`}
        </button>
      </form>
    </dialog>
  );
}
````

## components/PlayerPanel.tsx

````tsx
"use client";
import { useState } from "react";
import { BOARD, cash } from "@/lib/game/board";
import { bankStock, liquidationValue, netWorth } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";

import { CountryArt } from "./TravelArt";
export default function PlayerPanel({ game, me, busy, send, onTrade, onSelect }: {
  game: Game; me: Player; busy: boolean; send: (a: Action) => void;
  onTrade: () => void; onSelect: (id: number) => void;
}) {
  const [panelTab, setPanelTab] = useState<"turn" | "assets">("turn");
  const [offer, setOffer] = useState(500);
  const [buildSquare, setBuildSquare] = useState<number | null>(null);
  const options = game.auction?.buildingOptions?.[me.id];
  const destination = options?.includes(buildSquare ?? -1) ? buildSquare! : options?.[0];
  const minimumBid = Math.max((game.auction?.amount ?? 0) + 500, destination === undefined ? 0 : BOARD[destination].buildCost);
  const active = game.players[game.turn], mine = active.id === me.id && !me.bankrupt;
  const debt = game.debt && (game.debt.payer ?? active.id) === me.id ? game.debt : null;
  const imprisoned = me.jailed > 0 && me.detention === "prison";
  const stock = bankStock(game);
  const button = (label: string, action: Action, reason: string | null = null) => <div>
    <button className="primary" disabled={busy || !!reason} title={reason ?? ""} onClick={() => send(action)}>{label}</button>
    {reason && <small>{reason}</small>}
  </div>;
  const properties = BOARD.filter((b) => game.properties[b.id]?.owner === me.id);
  const [propertyPage, setPropertyPage] = useState(0);
  const visiblePage = Math.min(propertyPage, Math.max(0, Math.ceil(properties.length / 4) - 1));
  return <section className={`panel player-panel ${mine ? "my-turn" : ""}`}>
    <p className="eyebrow">{game.opening ? "ELIGE QUIÉN DESPEGA" : mine ? "ES TU TURNO" : `VIAJA ${active.name}`}</p>
    <div className="row"><h2><i className="player-dot" style={{background:me.color}} />{me.name}</h2><span className="balance">{cash(me.money)}</span></div>
    <small>Patrimonio neto: {cash(netWorth(game, me))} · {properties.length} propiedades</small>
    <div className="tabs player-tabs"><button aria-pressed={panelTab === "turn"} onClick={()=>setPanelTab("turn")}>Mi turno</button><button aria-pressed={panelTab === "assets"} onClick={()=>setPanelTab("assets")}>Propiedades ({properties.length})</button></div>
    <div hidden={panelTab !== "turn"}>
    {me.acquisitionCard && <p className="notice">Tienes un permiso de adquisición. Selecciona el último país que te falte para completar un bloque.</p>}
    {me.rentBonus && <p className="notice">La próxima renta de un país sin edificios se duplica.</p>}
    {me.jailed > 0 && <div className="detention"><strong>{imprisoned ? "Cárcel" : "Deportado"}</strong><p>Quedan {me.jailed} turnos completos. Los dobles no reducen la estancia.</p><div className="detention-steps" aria-label={`${me.jailed} turnos pendientes`}>{[1,2,3].map((i) => <span key={i} className={i <= me.jailed ? "pending" : ""}>{i <= me.jailed ? "▥" : "✓"}</span>)}</div></div>}
    {!!me.skipTurns && <p>Estancia por carta: {me.skipTurns} turnos pendientes.</p>}
    {me.jailed > 0 && me.passes.length > 0 && !game.auction && button("Usar pase diplomático", {type:"pass"})}
    {mine && !!me.salary && !game.auction && button(`Cobrar sueldo · ${cash(me.salary)}`, {type:"salary"})}
    {me.bankrupt ? <p>Terminó tu viaje. Puedes seguir viendo la partida.</p> : <div className="actions">
      {game.opening ? <>
        <p>El número más alto inicia. En caso de empate vuelven a tirar los finalistas.</p>
        {game.opening.candidates.map((id) => <div className="row" key={id}><span>{game.players.find((p) => p.id === id)?.name}</span><b>{game.opening?.rolls[id] ?? "Por tirar"}</b></div>)}
        {button("Tirar dado de salida", {type:"opening-roll"}, !game.opening.candidates.includes(me.id) ? "Espera el desempate." : game.opening.rolls[me.id] !== undefined ? "Esperando a los demás." : null)}
      </> : game.auction ? <div className="auction-box">
        <span className="eyebrow">SUBASTA EN VIVO</span><h3>{game.auction.buildingOptions ? "Último edificio disponible" : BOARD[game.auction.square].name}</h3>
        <p>{game.auction.bidder ? `${game.players.find((p) => p.id === game.auction?.bidder)?.name} ofrece ${cash(game.auction.amount)}` : "Oferta inicial desde $500"}</p>
        <small>Quedan {Math.max(0, Math.ceil((game.auction.endsAt - Date.now()) / 1000))} s. Cada oferta añade 20 s.</small>
        {game.auction.buildingOptions && options?.length ? <label>Construir en<select value={destination} onChange={(e)=>setBuildSquare(Number(e.target.value))}>{options.map((id)=><option key={id} value={id}>{BOARD[id].name}</option>)}</select></label> : null}
        <label>Tu oferta<input type="number" step="500" min={game.auction.amount+500} max={me.money} value={Math.max(offer,minimumBid)} onChange={(e) => setOffer(Number(e.target.value))}/></label>
        {button("Ofertar", {type:"bid",amount:Math.max(offer,minimumBid),square:destination}, imprisoned ? "No puedes comprar desde la cárcel." : game.auction.buildingOptions && !options?.length ? "No tienes un país listo para construir." : game.auction.passed.includes(me.id) ? "Te retiraste de esta subasta." : Math.max(offer,minimumBid)>me.money ? "Saldo insuficiente." : null)}
        {button("Pasar esta subasta", {type:"fold"}, imprisoned || game.auction.passed.includes(me.id) || game.auction.bidder === me.id ? "No disponible." : null)}
        <small>La oferta ganadora se paga automáticamente al cerrar.</small>
      </div> : debt ? <>
        <p className="error">Pago pendiente: {cash(debt.amount)}. Puedes seleccionar billetes o reunir dinero administrando tus propiedades.</p>
        {button("Seleccionar billetes y pagar", {type:"settle"}, me.money < debt.amount ? "Primero reúne el importe completo." : null)}
        {button("Declarar quiebra", {type:"bankrupt"}, liquidationValue(game, me) >= debt.amount ? "Tus activos todavía pueden cubrir el pago." : null)}
      </> : game.debt ? <p className="notice">Esperando el pago de {game.players.find((p) => p.id === (game.debt?.payer ?? active.id))?.name}.</p> : game.choice ? <>
        <p>Elige al viajero que te pagará {cash(game.choice.amount)}.</p>
        {game.choice.player === me.id ? game.players.filter((p) => p.id !== me.id && !p.bankrupt).map((p) => <button key={p.id} onClick={() => send({type:"collect",target:p.id})} disabled={busy}>{p.name}</button>) : <small>Esperando la elección de {active.name}.</small>}
      </> : <>
        {game.phase === "roll" && (me.jailed || me.skipTurns) && mine ? button("Cumplir un turno de espera", {type:"wait"}) : game.phase === "roll" && button("✦ Tirar los dados", {type:"roll"}, mine ? null : "Espera tu turno.")}
        {mine && me.jailed > 0 && !imprisoned && button("Pagar $5,000 y volver a Salida", {type:"bail"}, me.money < 5000 ? "Saldo insuficiente." : null)}
        {mine && game.phase === "buy" && <div className="buy-scene"><div className="scene-country"><CountryArt id={me.position} /><span>{BOARD[me.position].flag ?? "✈"}</span><h2>{BOARD[me.position].name}</h2><p>¿Agregamos este destino a tu viaje?</p></div>
          {button(`Comprar ${BOARD[me.position].name} · ${cash(BOARD[me.position].price)}`, {type:"buy"}, me.money < BOARD[me.position].price ? "Saldo insuficiente." : null)}
          {button("Enviar a subasta", {type:"decline"})}
        </div>}
        {game.phase === "end" && button(game.extra ? "Continuar · tiro extra" : "Terminar turno →", {type:"end"}, mine ? null : "Espera tu turno.")}
        {mine && !!me.salary && <small>Si terminas el turno sin cobrar el sueldo, lo pierdes.</small>}
      </>}
    </div>}
    {!me.bankrupt && <button className="trade-trigger" onClick={onTrade} disabled={busy || !!game.debt || !!game.auction || !!game.opening || imprisoned} title={imprisoned ? "En la cárcel no puedes negociar." : "Ofrece dinero y propiedades, incluso fuera de tu turno."}>⇄ Proponer trato</button>}
    </div><div hidden={panelTab !== "assets"}>
    <h3>Mi pasaporte de propiedades</h3>
    <div className="owned">{properties.slice(visiblePage*4,visiblePage*4+4).map((b) => <button key={b.id} style={{borderLeftColor:b.color ?? "#777"}} onClick={() => onSelect(b.id)}>{b.flag} {b.name}<span>{game.properties[b.id].mortgaged ? "Hipotecada" : game.properties[b.id].buildings === 5 ? "Hotel" : game.properties[b.id].buildings ? `${game.properties[b.id].buildings} casas` : ""}</span></button>)}
      {!properties.length && <small>Tu primera escala te espera.</small>}
    </div>
    {properties.length>4 && <div className="row"><button disabled={!visiblePage} onClick={()=>setPropertyPage(visiblePage-1)}>←</button><small>{visiblePage+1} / {Math.ceil(properties.length/4)}</small><button disabled={(visiblePage+1)*4>=properties.length} onClick={()=>setPropertyPage(visiblePage+1)}>→</button></div>}
    <small className="bank-stock">Banco · {stock.houses} casas · {stock.hotels} hoteles disponibles</small>
    </div>
  </section>;
}
````

## components/PropertyCard.tsx

````tsx
import { Building, CountryArt } from "./TravelArt";
import { BOARD } from "@/lib/game/board";
import { assetError, group } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function PropertyCard({
  id,
  game,
  me,
  send,
  busy,
}: {
  id: number;
  game: Game;
  me: Player | undefined;
  send: (a: Action) => void;
  busy: boolean;
}) {
  const b = BOARD[id],
    a = game.properties[id],
    owner = game.players.find((p) => p.id === a?.owner);
  return (
    <section
      className="panel property"
      style={{ borderTopColor: b.color ?? "#175344" }}
    >
      <p className="eyebrow">{b.group ?? "ESCALA DEL VIAJE"}</p>
      {b.kind === "country" && <CountryArt id={b.id} />}
      <h2>{b.flag} {b.name}</h2>
      {!!a?.buildings && <div className="property-buildings">{a.buildings === 5 ? <Building hotel /> : Array.from({length: a.buildings}, (_, i) => <Building key={i} />)}</div>}
      {me?.acquisitionCard && b.kind === "country" && a?.owner !== me.id && group(id).every((x) => x.id === id || game.properties[x.id].owner === me.id) && <button className="primary" disabled={busy || !!game.debt || !!game.auction} onClick={() => send({type:"acquire", square:id})}>Usar permiso para completar bloque</button>}
      {b.price ? (
        <>
          <p>
            {owner ? `Propiedad de ${owner.name}` : "Disponible en el Banco"}
            {a?.mortgaged ? " · Hipotecada" : ""}
          </p>
          <dl>
            <div>
              <dt>Compra</dt>
              <dd>${b.price}</dd>
            </div>
            <div>
              <dt>Hipoteca</dt>
              <dd>${b.mortgage}</dd>
            </div>
            {b.buildCost > 0 && (
              <div>
                <dt>Por edificio</dt>
                <dd>${b.buildCost}</dd>
              </div>
            )}
          </dl>
          <div className="rent-list">
            {b.rents.map((r, i) => (
              <span key={i}>
                {b.kind === "country"
                  ? [
                      "Base",
                      "1 casa",
                      "2 casas",
                      "3 casas",
                      "4 casas",
                      "Hotel",
                    ][i]
                  : b.kind === "airline"
                    ? `${i + 1} aerolínea(s)`
                    : `${i + 1} servicio(s)`}
                <b>{b.kind === "utility" ? `${r} × dados` : `$${r}`}</b>
              </span>
            ))}
          </div>
          {b.kind === "country" && (
            <small>
              Renta base doble con el grupo completo. Edificios vendidos al
              Banco a mitad de precio.
            </small>
          )}
          {me && a?.owner === me.id && game.status === "playing" && (
            <div className="asset-actions">
              {(["build", "sell", "sell-group", "mortgage", "redeem", "return"] as const).map(
                (type) => {
                  const reason =
                    assetError(game, me, id, type);
                  return (
                    <div key={type}>
                      <button
                        disabled={busy || !!reason}
                        title={reason ?? ""}
                        onClick={() => send({ type, square: id })}
                      >
                        {
                          {
                            build: "Construir",
                            sell: "Vender edificio",
                            "sell-group": "Vender edificios del bloque",
                            mortgage: "Hipotecar",
                            redeem: "Deshipotecar",
                            return: "Devolver al Banco",
                          }[type]
                        }
                      </button>
                      {reason && <small>{reason}</small>}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </>
      ) : (
        <p>
          {b.kind === "oceania"
            ? "De visita al caer con dados. Si te envían aquí: paga $5,000 o cumple tres turnos completos; después regresas a Salida sin sueldo. Puedes administrar tus propiedades."
            : b.kind === "start"
              ? "Reclama $20,000 al pasar o caer aquí, antes de ceder el turno."
              : b.kind === "tax"
                ? `Paga $${b.tax} al Banco.`
                : b.kind === "go-oceania"
                  ? "Paga $10,000 de fianza y cumple tres turnos completos. No cobras rentas ni administras propiedades. Los dobles no te liberan."
                  : b.kind === "rest"
                    ? "Australia es descanso: no hay castigo al caer con dados. Algunas cartas pueden indicar una estancia especial."
                    : "Roba una carta y sigue sus instrucciones."}
        </p>
      )}
    </section>
  );
}
````

## components/PropertyDialog.tsx

````tsx
"use client";
import { useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import type { Action, Game, Player } from "@/lib/game/types";
export default function PropertyDialog({ id, game, me, busy, send, onClose }: {
  id:number; game:Game; me:Player|undefined; busy:boolean;
  send:(a:Action)=>void; onClose:()=>void;
}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{dialog.current?.showModal();},[]);
  return <dialog className="property-dialog" ref={dialog} onCancel={onClose} aria-label={`Tarjeta de propiedad`}>
    <button aria-label="Cerrar tarjeta" onClick={onClose}>Cerrar ×</button>
    <PropertyCard id={id} game={game} me={me} busy={busy} send={(a)=>{onClose();send(a);}}/>
  </dialog>;
}
````

## components/Room.tsx

````tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Action, Game } from "@/lib/game/types";
import { COLORS } from "@/lib/game/types";
import { BOARD } from "@/lib/game/board";
import { ranking, redemptionCost, buildingBidders } from "@/lib/game/rules";
import { Banknote } from "./TravelArt";
import { DENOMINATIONS, wallet } from "@/lib/game/money";
import Board from "./Board";
import EntryForm from "./EntryForm";
import PropertyDialog from "./PropertyDialog";
import PlayerPanel from "./PlayerPanel";
import TradeModal from "./TradeModal";

import Activity from "./Activity";
import PaymentModal from "./PaymentModal";
export default function Room({ id }: { id: string }) {
  const [game, setGame] = useState<Game | null>(null),
    [token, setToken] = useState<string | null>(null),
    [playerId, setPlayerId] = useState<string | null>(null),
    [error, setError] = useState(""),
    [connectionError, setConnectionError] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false),
    [missing, setMissing] = useState(false),
    [selected, setSelected] = useState(0),
    [propertyOpen, setPropertyOpen] = useState(false),
    [sideOpen, setSideOpen] = useState(false),
    [rosterOpen, setRosterOpen] = useState(false),
    [rosterIndex, setRosterIndex] = useState(0),
    [rosterPage, setRosterPage] = useState(0),
    [tradeOpen, setTradeOpen] = useState(false),
    [inactive, setInactive] = useState(0),
    [notice, setNotice] = useState(""),
    [sound, setSound] = useState(false),
    [now, setNow] = useState(Date.now());
  const [payment, setPayment] = useState<{
    action: Action;
    amount: number;
    label: string;
  } | null>(null);
  const state = useRef<Game | null>(null),
    heartbeat = useRef(0),
    inFlight = useRef(false),
    actionFlight = useRef(false);
  const apply = useCallback((next: Game) => {
    if (!state.current || next.version >= state.current.version) {
      state.current = next;
      setGame(next);
    }
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem(`turista:${id}`));
    setSound(localStorage.getItem("turista:sound") === "1");
    setLoaded(true);
  }, [id]);
  const refresh = useCallback(async () => {
    if (document.hidden || inFlight.current || !loaded) return;
    inFlight.current = true;
    try {
      const pulse = Date.now() - heartbeat.current > 20000;
      const response = await fetch(
        `/api/rooms/${id}?since=${state.current?.version ?? 0}`,
        {
          cache: "no-store",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "x-heartbeat": pulse ? "1" : "0",
              }
            : {},
          signal: AbortSignal.timeout(12000),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) setMissing(true);
        throw new Error(data.error);
      }
      if (pulse) heartbeat.current = Date.now();
      if (data.game) apply(data.game);
      setPlayerId(data.playerId);
      setInactive(data.inactiveFor ?? 0);
      setConnectionError("");
    } catch (e) {
      setConnectionError(e instanceof Error ? e.message : "Reconectando…");
    } finally {
      inFlight.current = false;
    }
  }, [id, token, loaded, apply]);
  useEffect(() => {
    if (!loaded) return;
    void refresh();
    const timer = setInterval(() => {
      setNow(Date.now());
      void refresh();
    }, 1000);
    const visible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [loaded, refresh]);
  const commit = async (action: Action): Promise<boolean> => {
    if (!token || !state.current || actionFlight.current) return false;
    actionFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/rooms/${id}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          action,
          version: state.current.version,
          requestId: crypto.randomUUID(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) {
        void refresh();
        throw new Error(data.error);
      }
      apply(data.game);
      if (sound && action.type === "roll") {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        gain.gain.value = 0.04;
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 0.12);
        osc.onended = () => void audio.close();
      }
      return true;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo enviar. Reconectando…",
      );
      return false;
    } finally {
      setBusy(false);
      actionFlight.current = false;
    }
  };
  const send = async (action: Action): Promise<boolean> => {
    const s = state.current;
    const p = s?.players.find((x) => x.id === playerId);
    if (!s || !p) return false;
    let amount = 0,
      label = "";
    if (action.type === "buy") {
      amount = BOARD[p.position].price;
      label = `Comprar ${BOARD[p.position].name}`;
    }
    if (action.type === "settle" && s.debt) {
      amount = s.debt.amount;
      label = `Pago a ${s.players.find((x) => x.id === s.debt?.creditor)?.name ?? "el Banco"}`;
    }
    if (action.type === "bail") {
      amount = 5000;
      label = "Multa para salir de Deportado";
    }
    if (action.type === "build") {
      if (Object.keys(buildingBidders(s, action.square)).length > 1) return commit(action);
      amount = BOARD[action.square].buildCost;
      label = `Construir en ${BOARD[action.square].name}`;
    }
    if (action.type === "redeem") {
      amount = redemptionCost(s, action.square);
      label = `Deshipotecar ${BOARD[action.square].name}`;
    }
    if (action.type === "acquire") {
      const b = BOARD[action.square]; amount = s.properties[b.id].owner ? b.rents[0] : b.price - 1000;
      label = `Completar bloque con ${b.name}`;
    }
    if (amount > 0) {
      setPayment({ action, amount, label });
      return false;
    }
    return commit(action);
  };
  const selectProperty = (square: number) => { setSelected(square); setPropertyOpen(true); };
  useEffect(() => {
    if (!game || !playerId) return;
    if ((game.phase === "buy" && game.players[game.turn].id === playerId) ||
        game.debt?.payer === playerId || game.trades.some((t) => t.to === playerId)) setSideOpen(true);
  }, [game?.phase, game?.debt?.payer, game?.trades, game?.turn, playerId, game]);
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copiado. Ya puedes invitar a tus amigos.");
    } catch {
      setNotice(`Copia este dato: ${value}`);
    }
  };
  if (missing)
    return (
      <main className="empty panel">
        <h1>Sala no encontrada</h1>
        <p>Revisa el ID. Las salas vencen después de 24 horas sin acciones.</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  if (!game)
    return (
      <main className="empty panel">
        <h1>Preparando tu viaje…</h1>
        <p role="status">{error || connectionError || "Conectando con la sala."}</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  const me = game.players.find((p) => p.id === playerId),
    host = playerId === game.host;
  const seconds = game.endsAt
    ? Math.max(0, Math.ceil((game.endsAt - now) / 1000))
    : null;
  return (
    <main className={`room ${game.status !== "lobby" ? "table-viewport" : ""} ${sideOpen ? "side-open" : ""} ${rosterOpen ? "roster-open" : ""}`}>
      <header className="room-header">
        <Link href="/" className="brand">
          ✈ RUMBO MUNDIAL
        </Link>
        <div className="room-code">
          <span>
            SALA <b>{id}</b>
          </span>
          <button onClick={() => void copy(id)}>Copiar ID</button>
          <button
            onClick={() => void copy(`${window.location.origin}/sala/${id}`)}
          >
            Copiar link
          </button>
        </div>
        <button
          aria-pressed={sound}
          onClick={() => {
            setSound(!sound);
            localStorage.setItem("turista:sound", sound ? "0" : "1");
          }}
        >
          Sonido {sound ? "activado" : "apagado"}
        </button>
      </header>
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {(error || connectionError) && (
        <p role="alert" className="error">
          {error || connectionError}
        </p>
      )}
      {game.status === "finished" && (
        <section className="victory panel">
          <p className="eyebrow">VIAJE COMPLETADO</p>
          <h1>
            {!game.winner.length && "Todos los viajeros quedaron en quiebra"}
            {game.winner
              .map((w) => game.players.find((p) => p.id === w)?.name)
              .join(" y ")}{" "}
            {game.winner.length ? `${game.winner.length > 1 ? "ganan" : "gana"} la partida` : ""}
          </h1>
          <ol className="ranking">
            {ranking(game).map(({ player: p, place, score }) => (
              <li key={p.id}>
                <strong>
                  {place}. {p.name}
                </strong>
                <span>
                  ${score.toLocaleString("es-MX")}
                  {p.bankrupt ? " · En quiebra" : ""}
                </span>
              </li>
            ))}
          </ol>
          <Link href="/">Organizar la revancha ↗</Link>
        </section>
      )}
      {game.status === "lobby" ? (
        <div className="lobby-grid">
          <section className="panel lobby">
            <p className="eyebrow">SALA DE ABORDAJE</p>
            <h1>
              El viaje empieza
              <br />
              con tus amigos.
            </h1>
            <p>
              Comparte el ID <b>{id}</b>. Necesitan de 2 a 6 jugadores.
            </p>
            <p>
              {game.duration
                ? `Partida de ${game.duration} minutos.`
                : "Gana el último jugador que siga en pie."}
            </p>
            <ul className="passengers">
              {game.players.map((p) => (
                <li key={p.id}>
                  <span style={{ background: p.color }}>✈</span>
                  <b>{p.name}</b>
                  <small>
                    {p.id === game.host ? "Anfitrión" : "Listo para viajar"}
                  </small>
                </li>
              ))}
            </ul>
            {me && (
              <>
                <fieldset>
                  <legend>Tu avión</legend>
                  <div className="colors">
                    {COLORS.map((c, i) => (
                      <button
                        key={c}
                        aria-label={`Color ${i + 1}`}
                        aria-pressed={me.color === c}
                        style={{ background: c }}
                        disabled={
                          busy ||
                          game.players.some(
                            (p) => p.id !== me.id && p.color === c,
                          )
                        }
                        onClick={() => void send({ type: "color", color: c })}
                      >
                        ✈
                      </button>
                    ))}
                  </div>
                </fieldset>
                {host ? (
                  <>
                    <button
                      className="primary"
                      disabled={busy || game.players.length < 2}
                      onClick={() => void send({ type: "start" })}
                    >
                      Iniciar partida
                    </button>
                    {game.players.length < 2 && (
                      <small>Espera a que llegue al menos un amigo.</small>
                    )}
                  </>
                ) : (
                  <p>El anfitrión iniciará la partida.</p>
                )}
              </>
            )}
          </section>
          {!me && !token ? (
            <EntryForm room={id} />
          ) : (
            <section className="panel guide">
              <h2>Antes de despegar</h2>
              <p>Todos empiezan con $134,500. Reclama $20,000 al pasar por Salida, antes de terminar tu turno.</p>
              <p>
                Compra países y completa grupos para construir casas.
                Cinco construcciones se convierten en un hotel.
              </p>
              <p>
                Deportado: multa de $5,000 o tres turnos. Cárcel: fianza de $10,000 y tres turnos completos. Australia es descanso.
              </p>
              <p>Selecciona cualquier casilla para consultar su tarjeta.</p>
            </section>
          )}
        </div>
      ) : (
        <>
          <div className="status-strip">
            <span>
              <i style={{ background: game.players[game.turn].color }} />
              Turno de <b>{game.players[game.turn].name}</b>
            </span>
            {seconds !== null && (
              <span>
                Tiempo: {Math.floor(seconds / 60)}:
                {String(seconds % 60).padStart(2, "0")}
              </span>
            )}
            <span>Viaje compartido · {game.players.filter((p) => !p.bankrupt).length} en juego</span>
          </div>
          <Activity game={game} />
          {game.status === "playing" && game.phase === "buy" && !game.auction && !game.debt && me?.id !== game.players[game.turn].id && <div className="buy-scene spectator-decision"><p className="eyebrow">DECISIÓN EN CURSO</p><h2>{game.players[game.turn].name} llegó a {BOARD[game.players[game.turn].position].name}</h2><p>Está decidiendo si compra la propiedad o la envía a subasta.</p></div>}
          <nav className="table-tools" aria-label="Paneles de la mesa">
            <button aria-expanded={sideOpen} onClick={()=>{setSideOpen(!sideOpen);setRosterOpen(false);}}>✈ Mi turno y propiedades</button>
            <button aria-expanded={rosterOpen} onClick={()=>{setRosterOpen(!rosterOpen);setSideOpen(false);}}>♟ Viajeros y propiedades</button>
          </nav>
          <div className="game-layout">
            <section>
              <Board game={game} onSelect={selectProperty} />
              <div className="players-strip" aria-label="Propiedades de los viajeros"><button className="panel-close" onClick={()=>setRosterOpen(false)}>Cerrar ×</button><label>Viajero<select value={rosterIndex} onChange={(e)=>{setRosterIndex(Number(e.target.value));setRosterPage(0);}}>{game.players.map((p,i)=><option value={i} key={p.id}>{p.name}</option>)}</select></label>
                {game.players.filter((_, i)=>i===rosterIndex).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderColor: p.color,
                      opacity: p.bankrupt ? 0.5 : 1,
                    }}
                  >
                    <b>{p.name}</b>
                    <span>
                      {p.bankrupt
                        ? "En quiebra"
                        : `$${p.money.toLocaleString("es-MX")}`}
                    </span>
                    <details open>
                      <summary>
                        {
                          Object.values(game.properties).filter(
                            (a) => a.owner === p.id,
                          ).length
                        }{" "}
                        propiedades
                      </summary>
                      <div className="owned">
                        {BOARD.filter(
                          (b) => game.properties[b.id]?.owner === p.id,
                        ).slice(rosterPage*4,rosterPage*4+4).map((b) => (
                          <button key={b.id} onClick={() => selectProperty(b.id)}>
                            {b.name}
                            {game.properties[b.id].mortgaged ? " · H" : ""}
                          </button>
                        ))}
                      </div>
                      <div className="row"><button disabled={!rosterPage} onClick={()=>setRosterPage(rosterPage-1)}>←</button><span>Página {rosterPage+1}</span><button disabled={(rosterPage+1)*4>=Object.values(game.properties).filter((a)=>a.owner===p.id).length} onClick={()=>setRosterPage(rosterPage+1)}>→</button></div>
                    </details>
                  </div>
                ))}
              </div>

            </section>
            <aside aria-label="Panel de jugador"><button className="panel-close" onClick={()=>setSideOpen(false)}>Volver al tablero ×</button>
              {me && game.status === "playing" && (
                <PlayerPanel
                  game={game}
                  me={me}
                  busy={busy}
                  send={(a) => void send(a)}
                  onTrade={() => setTradeOpen(true)}
                  onSelect={selectProperty}
                />
              )}
              {game.trades
                .filter((t) => t.to === playerId || t.from === playerId)
                .map((t) => (
                  <section className="panel trade-scene" key={t.id}>
                    <h2>Propuesta de trato</h2>
                    <p>
                      {game.players.find((p) => p.id === t.from)?.name} ofrece $
                      {t.giveMoney} y{" "}
                      {t.give.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    <p>
                      Pide ${t.takeMoney} y{" "}
                      {t.take.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    {t.to === playerId && (
                      <button
                        className="primary"
                        disabled={busy || !!game.debt}
                        onClick={() =>
                          void send({ type: "accept", trade: t.id })
                        }
                      >
                        Aceptar trato
                      </button>
                    )}
                    <button
                      disabled={busy}
                      onClick={() => void send({ type: "reject", trade: t.id })}
                    >
                      {t.from === playerId ? "Cancelar" : "Rechazar"}
                    </button>
                  </section>
                ))}
              {host && game.status === "playing" && inactive >= 90000 && (
                <section className="panel">
                  <h2>Jugador sin conexión</h2>
                  <p>Sin responder por más de 90 segundos.</p>
                  <button
                    disabled={busy || !!game.debt}
                    onClick={() => void send({ type: "skip" })}
                  >
                    Saltar turno
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => {
                      if (
                        window.confirm(
                          "¿Declarar en quiebra al jugador inactivo?",
                        )
                      )
                        void send({ type: "expel" });
                    }}
                  >
                    Declarar quiebra
                  </button>
                </section>
              )}
            </aside>
          </div>
        </>
      )}
      {me && game.status !== "lobby" && <div className="wallet" aria-label="Mi mano de billetes"><div className="wallet-summary">{DENOMINATIONS.filter((v)=>wallet(me)[v]).map((v)=><span key={v}><Banknote value={v} compact/><b>× {wallet(me)[v]}</b></span>)}</div></div>}
      {propertyOpen && <PropertyDialog id={selected} game={game} me={me} busy={busy} send={(a)=>void send(a)} onClose={()=>setPropertyOpen(false)} />}
      {payment && me && game.status === "playing" && (

        <PaymentModal
          player={me}
          {...payment}
          error={error}
          onClose={() => setPayment(null)}
          commit={commit}
        />
      )}
      {tradeOpen && me && (
        <TradeModal
          game={game}
          me={me}
          error={error}
          send={send}
          onClose={() => setTradeOpen(false)}
        />
      )}
      <footer>
        Reglas y valores adaptados · Selecciona una casilla para conocer sus
        detalles.
      </footer>
    </main>
  );
}
````

## components/TradeModal.tsx

````tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { BOARD } from "@/lib/game/board";
import { group } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function TradeModal({
  game,
  me,
  onClose,
  send,
  error,
}: {
  game: Game;
  me: Player;
  error?: string;
  onClose: () => void;
  send: (a: Action) => Promise<boolean>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const others = game.players.filter((p) => p.id !== me.id && !p.bankrupt && !(p.jailed && p.detention === "prison"));
  const [to, setTo] = useState(others[0]?.id ?? "");
  const [give, setGive] = useState<number[]>([]);
  const [take, setTake] = useState<number[]>([]);
  const [gm, setGm] = useState(0);
  const [tm, setTm] = useState(0);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  const properties = (owner: string) =>
    BOARD.filter(
      (b) =>
        game.properties[b.id]?.owner === owner &&
        !game.properties[b.id].buildings &&
        !group(b.id).some((x) => game.properties[x.id].buildings),
    );
  return (
    <dialog ref={dialog} onCancel={onClose} className="trade-modal">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          if (
            await send({
              type: "trade",
              to,
              give,
              take,
              giveMoney: gm,
              takeMoney: tm,
            })
          )
            onClose();
          setBusy(false);
        }}
      >
        <div className="row">
          <h2>Hagamos un trato</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <label>
          Negociar con
          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setTake([]);
            }}
          >
            {others.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <div className="trade-columns">
          {[
            {
              title: "Tú ofreces",
              owner: me.id,
              selected: give,
              set: setGive,
              money: gm,
              setMoney: setGm,
            },
            {
              title: "Tú pides",
              owner: to,
              selected: take,
              set: setTake,
              money: tm,
              setMoney: setTm,
            },
          ].map((side) => (
            <fieldset key={side.title}>
              <legend>{side.title}</legend>
              <label>
                Dinero
                <input
                  type="number"
                  min={0}
                  max={
                    game.players.find((p) => p.id === side.owner)?.money ?? 0
                  }
                  value={side.money}
                  onChange={(e) => side.setMoney(Number(e.target.value))}
                />
              </label>
              {properties(side.owner).map((b) => (
                <label key={b.id} className="checkbox">
                  <input
                    type="checkbox"
                    checked={side.selected.includes(b.id)}
                    onChange={(e) =>
                      side.set(
                        e.target.checked
                          ? [...side.selected, b.id]
                          : side.selected.filter((id) => id !== b.id),
                      )
                    }
                  />
                  {b.name}
                  {game.properties[b.id].mortgaged ? " (hipotecada)" : ""}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <p>
          Solo propiedades de grupos sin edificios. Las hipotecas se transfieren
          y conservan su costo de liberación.
        </p>
        <button className="primary" disabled={busy || !to}>
          Enviar propuesta
        </button>
      </form>
    </dialog>
  );
}
````

## components/TravelArt.tsx

````tsx
import Image from "next/image";
import { COUNTRY_ART } from "@/lib/game/art";
import type { CSSProperties } from "react";

/** Original vector artwork: no downloaded illustration or reference photograph. */
export function Globe({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 360 240" fill="none" aria-hidden="true">
    <ellipse cx="180" cy="218" rx="94" ry="12" fill="currentColor" opacity=".08" />
    <circle cx="180" cy="112" r="94" fill="#d7efeb" stroke="#217b7b" strokeWidth="2" />
    <ellipse cx="180" cy="112" rx="48" ry="94" stroke="#8bc3b7" />
    <ellipse cx="180" cy="112" rx="82" ry="94" stroke="#8bc3b7" />
    <path d="M86 112h188M100 64h160M100 160h160M180 18v188" stroke="#8bc3b7" />
    <path d="m115 46 22-10 15 8 9 23-8 12-13 2 3 17-10 13-18-7-3-14-13-9 4-18zm28 69 24 5 14 17-8 27-17 25-8-8-1-23-11-18zm51-71 18-9 25 13-3 12 20 13 8 21-14 10-23-6-9 12-10-8 4-19-18-10zm1 61 21 4 14 24-10 27-12 5-14-23-8-23zm43 54 22 4 8 15-18 8-19-8z" fill="#60a695" />
    <path d="M54 151C16 185 53 210 151 183s180-95 153-119c-10-8-26-8-42-4" stroke="#e5914c" strokeWidth="3" strokeDasharray="6 6" />
    <g transform="translate(290 65) rotate(-35)"><path d="m0-18 5 13 18 10v5L5 6l-1 13 7 6v4L0 25l-11 4v-4l7-6-1-13-18 4V5L-5-5z" fill="#203f59" stroke="#fff" strokeWidth="2" /></g>
    <circle cx="130" cy="101" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
    <circle cx="227" cy="69" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
  </svg>;
}
export function Building({ hotel = false }: { hotel?: boolean }) {
  return <svg className={`building-piece ${hotel ? "hotel" : "house"}`} viewBox="0 0 32 32" aria-label={hotel ? "Hotel" : "Casa"} role="img">
    {hotel ? <><path d="M7 6h19v23H7z" fill="#c66646"/><path d="M3 10 7 6v23l-4-3z" fill="#91442e"/><path d="M5 4h23v4H5z" fill="#edab70"/><path d="M11 11h4v4h-4zm7 0h4v4h-4zm-7 7h4v4h-4zm7 0h4v4h-4z" fill="#ffedbc"/><path d="M14 24h5v5h-5z" fill="#723c37"/></> : <><path d="M5 15 17 5l12 10v14H5z" fill="#5db6a2"/><path d="M2 15 16 3l15 12-3 3L16 8 5 18z" fill="#216c68"/><path d="M10 20h6v9h-6zm10-3h5v6h-5z" fill="#fff0b8"/></>}
  </svg>;
}
export function Banknote({ value, compact = false }: { value: number; compact?: boolean }) {
  const palette: Record<number, string> = {50000:"#a883c7",10000:"#75a99d",5000:"#77a8c7",2000:"#d5a16a",1000:"#d58e99",500:"#afad71"};
  return <span className={`note-art ${compact ? "compact" : ""}`} style={{ "--note-color": palette[value] ?? "#9aa7ab" } as CSSProperties}>
    <span className="note-label">BANCO DEL VIAJERO</span><span className="note-orbit" aria-hidden="true">✈</span>
    <strong>${value.toLocaleString("es-MX")}</strong><span className="note-serial">RM · CRÉDITOS DE VIAJE</span>
  </span>;
}

export function CountryArt({ id }: { id: number }) {
  const art = COUNTRY_ART[id];
  if (!art) return null;
  return <Image className="country-art" src={art.src} alt={`Ilustración de ${art.name}`} width={960} height={640} sizes="(max-width: 780px) 90vw, 430px" />;
}
````

## lib/game/art.ts

````typescript
// Ilustraciones raster originales generadas para este proyecto; no son las fotos de referencia.
export const COUNTRY_ART: Record<number, {name:string;src:string}> = {
  1:{name:"Marruecos",src:"/art/countries/marruecos.webp"},
  2:{name:"Egipto",src:"/art/countries/egipto.webp"},
  4:{name:"Sudáfrica",src:"/art/countries/sudafrica.webp"},
  6:{name:"Rusia",src:"/art/countries/rusia.webp"},
  7:{name:"China",src:"/art/countries/china.webp"},
  9:{name:"Japón",src:"/art/countries/japon.webp"},
  11:{name:"Canadá",src:"/art/countries/canada.webp"},
  12:{name:"Estados Unidos",src:"/art/countries/estados-unidos.webp"},
  14:{name:"México",src:"/art/countries/mexico.webp"},
  16:{name:"Guatemala",src:"/art/countries/guatemala.webp"},
  17:{name:"Costa Rica",src:"/art/countries/costa-rica.webp"},
  19:{name:"Panamá",src:"/art/countries/panama.webp"},
  21:{name:"Colombia",src:"/art/countries/colombia.webp"},
  23:{name:"Venezuela",src:"/art/countries/venezuela.webp"},
  24:{name:"Perú",src:"/art/countries/peru.webp"},
  26:{name:"Brasil",src:"/art/countries/brasil.webp"},
  28:{name:"Chile",src:"/art/countries/chile.webp"},
  29:{name:"Argentina",src:"/art/countries/argentina.webp"},
  31:{name:"España",src:"/art/countries/espana.webp"},
  32:{name:"Francia",src:"/art/countries/francia.webp"},
  34:{name:"Inglaterra",src:"/art/countries/inglaterra.webp"},
  36:{name:"Italia",src:"/art/countries/italia.webp"},
  38:{name:"Suiza",src:"/art/countries/suiza.webp"},
  39:{name:"Alemania",src:"/art/countries/alemania.webp"},
};
````

## lib/game/board.ts

````typescript
import type { Square, SquareKind } from "./types";

// Datos transcritos de las referencias del usuario. El arte se dibuja en código.
// Los índices siguen el recorrido: Salida → Marruecos, en sentido antihorario.
const special = (id: number, name: string, kind: SquareKind): Square =>
  ({ id, name, kind, price: 0, mortgage: 0, rents: [], buildCost: 0 });
const colors: Record<string, string> = {
  África: "#df9a43", Asia: "#df6475", Norteamérica: "#459ed2",
  Centroamérica: "#e5c348", "Andes y Caribe": "#8eb95a",
  "Cono Sur": "#b08759", "Europa occidental": "#a985d4", "Europa central": "#50b39d",
};
const country = (id: number, name: string, group: string, flag: string,
  price: number, rents: number[], buildCost: number): Square => ({
  id, name, kind: "country", group, color: colors[group], flag, price,
  mortgage: price / 2, rents, buildCost,
});
const airline = (id: number, name: string): Square => ({
  ...special(id, name, "airline"), price: 20000, mortgage: 10000,
  rents: [2500, 5000, 10000, 20000],
});
const utility = (id: number, name: string): Square => ({
  ...special(id, name, "utility"), price: 20000, mortgage: 10000, rents: [500, 1000],
});
export const BOARD: Square[] = [
  special(0, "Salida", "start"),
  country(1, "Marruecos", "África", "🇲🇦", 12000, [1500,5000,13000,36000,48000,60000], 5000),
  country(2, "Egipto", "África", "🇪🇬", 15000, [2000,6000,17000,45000,60000,75000], 10000),
  utility(3, "Embajada"),
  country(4, "Sudáfrica", "África", "🇿🇦", 23000, [2500,9500,25000,69000,92000,115000], 10000),
  airline(5, "Aerolínea Afroasiática"),
  country(6, "Rusia", "Asia", "🇷🇺", 24000, [3000,9500,26000,72000,96000,120000], 15000),
  country(7, "China", "Asia", "🇨🇳", 28000, [3000,11500,30500,84000,112000,140000], 15000),
  special(8, "Mensaje", "sms"),
  // La tarjeta fotografiada imprime 144,000 con tres casas: se conserva ese valor.
  country(9, "Japón", "Asia", "🇯🇵", 38000, [4500,15500,41500,144000,152000,190000], 20000),
  special(10, "Deportado", "oceania"),
  country(11, "Canadá", "Norteamérica", "🇨🇦", 30000, [4000,12000,33000,90000,120000,150000], 20000),
  country(12, "Estados Unidos", "Norteamérica", "🇺🇸", 40000, [5000,16000,44000,120000,160000,200000], 20000),
  special(13, "Correo", "email"),
  // La hipoteca del reverso de México difiere: prevalece el precio del tablero / 2.
  country(14, "México", "Norteamérica", "🇲🇽", 26000, [3000,11000,29000,78000,104000,130000], 15000),
  airline(15, "Aerolínea Americana"),
  country(16, "Guatemala", "Centroamérica", "🇬🇹", 10000, [1500,4000,11000,30000,40000,50000], 5000),
  country(17, "Costa Rica", "Centroamérica", "🇨🇷", 10000, [1500,4000,11000,30000,40000,50000], 5000),
  special(18, "Mensaje", "sms"),
  country(19, "Panamá", "Centroamérica", "🇵🇦", 8000, [1000,3500,8000,24000,32000,40000], 5000),
  special(20, "Australia", "rest"),
  // Bloques según los títulos: Perú/Colombia/Venezuela y Brasil/Chile/Argentina.
  country(21, "Colombia", "Andes y Caribe", "🇨🇴", 20000, [2500,8000,22000,60000,80000,100000], 10000),
  utility(22, "Consulado"),
  country(23, "Venezuela", "Andes y Caribe", "🇻🇪", 22000, [2500,8000,24000,66000,88000,110000], 10000),
  country(24, "Perú", "Andes y Caribe", "🇵🇪", 18000, [2000,7500,19500,54000,72000,90000], 10000),
  airline(25, "Aerolínea Sudamericana"),
  country(26, "Brasil", "Cono Sur", "🇧🇷", 26000, [3000,11000,29000,78000,112000,130000], 15000),
  special(27, "Correo", "email"),
  country(28, "Chile", "Cono Sur", "🇨🇱", 18000, [2000,7500,19500,54000,72000,90000], 10000),
  country(29, "Argentina", "Cono Sur", "🇦🇷", 25000, [3000,10000,27500,75000,100000,125000], 15000),
  special(30, "Cárcel", "go-oceania"),
  country(31, "España", "Europa occidental", "🇪🇸", 28000, [3500,11500,30500,84000,112000,140000], 15000),
  country(32, "Francia", "Europa occidental", "🇫🇷", 36000, [4500,15000,39500,108000,144000,180000], 20000),
  special(33, "Correo", "email"),
  country(34, "Inglaterra", "Europa occidental", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 32000, [4000,13000,35000,96000,128000,160000], 20000),
  airline(35, "Aerolínea Europea"),
  country(36, "Italia", "Europa central", "🇮🇹", 35000, [4000,14000,39000,105000,140000,175000], 20000),
  special(37, "Mensaje", "sms"),
  country(38, "Suiza", "Europa central", "🇨🇭", 36000, [4500,14500,39500,108000,144000,180000], 15000),
  country(39, "Alemania", "Europa central", "🇩🇪", 37000, [4500,15000,40000,111000,148000,185000], 20000),
];
export const RULES_VERSION = 2;
export const GAME_NAME = "Rumbo Mundial";
export const SALARY = 20000;
export const INITIAL_MONEY = 134500;
export const DEPORTATION_FINE = 5000;
export const PRISON_BAIL = 10000;
// VERIFICAR: la transcripción no especifica inventario; configuración de esta adaptación.
export const HOUSE_SUPPLY = 36;
export const HOTEL_SUPPLY = 12;
export const cash = (amount: number) => `$${amount.toLocaleString("es-MX")}`;
````

## lib/game/cards.ts

````typescript
// Redacción original. Efectos inspirados en las referencias aportadas por el usuario.
export type Card = { text: string } & (
  | { kind: "money"; amount: number }
  | { kind: "move"; target: number; fine?: number; skip?: number }
  | { kind: "jail"; detention?: "prison" | "oceania"; turns?: number; fine?: number }
  | { kind: "pass" | "acquisition" | "bonus" | "refund" | "expropriate" | "airline" }
  | { kind: "collect"; amount: number; skip?: number }
  | { kind: "everyone"; amount: number; toPlayer?: boolean }
  | { kind: "repairs"; restaurant: number; hotel: number }
);
export const CARDS: Record<"email" | "sms", Card[]> = {
  email: [
    { kind: "acquisition", text: "Última pieza del rompecabezas. Guarda este permiso para adquirir el país que complete uno de tus bloques: paga la renta a su dueño, o el precio menos $1,000 al Banco." },
    { kind: "bonus", text: "Tu ruta se vuelve tendencia. La próxima visita a uno de tus países sin casas ni hotel paga el doble de la renta habitual. Una sola vez." },
    { kind: "collect", amount: 10000, skip: 1, text: "Ganaste el concurso de maletas imposibles. Elige a un viajero para cobrarle $10,000; descansa tu siguiente turno." },
    { kind: "money", amount: -1000, text: "Confundiste la fila del museo con la de las tortillas. Paga $1,000 por reponer tu entrada." },
    { kind: "money", amount: -5000, text: "La clase de baile incluyó una caída espectacular. La consulta cuesta $5,000." },
    { kind: "refund", text: "Tu última compra tenía un trámite pendiente. Devuélvela al Banco: recuperas la mitad del precio y de sus edificios, descontando su hipoteca." },
    { kind: "money", amount: 5000, text: "El autobús se fue con tu sombrero. La compañía te compensa con $5,000." },
    { kind: "money", amount: -2000, text: "La ganga del mercado no pasó la revisión. Paga $2,000 de multa." },
    { kind: "everyone", amount: 1000, text: "La foto grupal salió carísima. Paga $1,000 a cada uno de los demás viajeros." },
    { kind: "money", amount: 5000, text: "Perdiste tu conexión por un error del aeropuerto. Recibe $5,000 de compensación." },
    { kind: "money", amount: 20000, text: "Tu diario de viaje gana un premio. Cobra $20,000 y presume tu mejor anécdota." },
    { kind: "everyone", amount: 5000, toPlayer: false, text: "La excursión terminó con una multa colectiva. Todos pagan $5,000 al Banco." },
    { kind: "money", amount: 5000, text: "Tu reservación incluía sol, pero llegó lluvia. El hotel devuelve $5,000." },
    { kind: "move", target: 39, fine: 2000, text: "Te esperan en Alemania. Avanza hasta allí, resuelve la casilla y paga $2,000 por un trámite pendiente." },
    { kind: "money", amount: 5000, text: "La agencia reconoce su error en tu itinerario. Cobra $5,000." },
    { kind: "repairs", restaurant: 1000, hotel: 5000, text: "Hora de renovar las instalaciones: paga $1,000 por casa y $5,000 por hotel." },
  ],
  sms: [
    { kind: "pass", text: "Pase diplomático. Guárdalo para cancelar una deportación o la cárcel, incluida la fianza pendiente. Se usa una sola vez." },
    { kind: "jail", detention: "prison", turns: 1, text: "Tu pasaporte pasó por la lavadora. Ve a Cárcel, paga $10,000 de fianza y pierde un turno por esta revisión especial." },
    { kind: "money", amount: -5000, text: "La alberca no era el lugar para estrenar tu salsa. Paga $5,000 de limpieza." },
    { kind: "move", target: 0, text: "Conexión exprés. Avanza a Salida y recuerda cobrar tu sueldo de $20,000." },
    { kind: "money", amount: 2000, text: "Reclamación aprobada por el equipaje abollado. Recibe $2,000." },
    { kind: "money", amount: 10000, text: "La cena no fue lo que prometía el menú. El restaurante devuelve $10,000." },
    { kind: "money", amount: 5000, text: "Ganaste un concurso de postales. Cobra $5,000 y manda una al grupo." },
    { kind: "move", target: 20, skip: 2, text: "Escala larga en Australia. Viaja hasta allí y descansa dos turnos por esta carta." },
    { kind: "everyone", amount: -1000, text: "Se organizó la vaquita del viaje. Cada viajero te aporta $1,000." },
    { kind: "expropriate", text: "Nueva ruta ferroviaria. Tu propiedad más cara vuelve al Banco y se subasta. Recibes su renta base y la mitad del valor de sus edificios." },
    { kind: "jail", detention: "oceania", fine: 1000, text: "Tu visa tenía la fecha equivocada. Paga $1,000 y ve a Deportado; después elige entre la multa de salida o tres turnos." },
    { kind: "airline", text: "Compra de último minuto. Ve a la aerolínea libre más cercana y cómprala por su precio más $5,000. Si no queda ninguna, no ocurre nada." },
    { kind: "money", amount: 5000, text: "El aeropuerto recuperó tu maleta y te compensa con $5,000 por la demora." },
    { kind: "money", amount: -5000, text: "El recuerdo gigante necesitó su propio asiento. Paga $5,000 de equipaje extra." },
    { kind: "money", amount: -15000, text: "Corrección urgente de tus documentos de viaje. Paga $15,000 al Banco." },
    { kind: "move", target: 14, text: "Se te antojaron unos tacos. Avanza hasta México y resuelve esa casilla normalmente." },
  ],
};
````

## lib/game/engine.ts

````typescript
import { INITIAL_BILLS, pay, exchange, credit } from "./money";
import type { GameEvent } from "./types";
import { BOARD, RULES_VERSION, INITIAL_MONEY, SALARY, DEPORTATION_FINE, PRISON_BAIL } from "./board";
import { CARDS } from "./cards";
import { assetError, group, liquidationValue, netWorth, rent, redemptionCost, buildingBidders } from "./rules";
import {
  COLORS,
  type Action,
  type Context,
  type Game,
  type Player,
} from "./types";
function requireRule(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(message);
}
export function addLog(
  s: Game,
  text: string,
  event: Omit<GameEvent, "id" | "text"> = { type: "log" },
) {
  s.log = [...s.log, text].slice(-50);
  s.eventSerial = (s.eventSerial ?? 0) + 1;
  s.events = [...(s.events ?? []), { ...event, id: s.eventSerial, text }].slice(
    -100,
  );
}
export function newGame(id: string, host: Player, duration: number): Game {
  return {
    id,
    version: 1,
    rulesVersion: RULES_VERSION,
    turnNumber: 0,
    debts: [],
    auction: null,
    auctionQueue: [],
    choice: null,
    opening: null,
    host: host.id,
    status: "lobby",
    players: [host],
    properties: Object.fromEntries(
      BOARD.filter((b) => b.price).map((b) => [
        b.id,
        { owner: null, buildings: 0, mortgaged: false },
      ]),
    ),
    turn: 0,
    phase: "roll",
    doubles: 0,
    extra: false,
    dice: [1, 1],
    debt: null,
    trades: [],
    decks: { email: [], sms: [] },
    log: [`${host.name} creó la sala.`],
    duration,
    endsAt: null,
    turnAt: 0,
    winner: [],
    motion: null,
    lastCard: null,
    events: [],
    eventSerial: 0,
    eliminated: [],
  };
}
export function newPlayer(id: string, name: string, color: string): Player {
  return {
    id,
    name,
    color,
    money: INITIAL_MONEY,
    position: 0,
    jailed: 0,
    bankrupt: false,
    passes: [],
    bills: { ...INITIAL_BILLS },
  };
}
function nextTurn(s: Game, now: number) {
  s.players[s.turn].salary = 0;
  s.turnNumber = (s.turnNumber ?? 0) + 1;
  s.debt = null;
  s.doubles = 0;
  s.extra = false;
  s.phase = "roll";
  s.turnAt = now;
  for (let i = 0; i < s.players.length; i++) {
    s.turn = (s.turn + 1) % s.players.length;
    if (!s.players[s.turn].bankrupt) break;
  }
}
export function finishByTime(state: Game, now: number): Game {
  if (state.status !== "playing") return state;
  if (state.endsAt && now >= state.endsAt) {
    const s = structuredClone(state), active = s.players.filter((p) => !p.bankrupt);
    const score = (p: Player) => netWorth(s, p) - [s.debt, ...(s.debts ?? [])]
      .reduce((sum, d) => sum + (d && (d.payer ?? s.players[s.turn].id) === p.id ? d.amount : 0), 0);
    const best = Math.max(...active.map(score));
    s.winner = active.filter((p) => score(p) === best).map((p) => p.id);
    s.status = "finished"; s.trades = []; s.auction = null; s.choice = null;
    addLog(s, "Terminó el tiempo. Se compara el patrimonio neto.");
    return s;
  }
  if (state.auction && now >= state.auction.endsAt) {
    const s = structuredClone(state); closeAuction(s, now); return s;
  }
  return state;
}
function winner(s: Game) {
  const alive = s.players.filter((p) => !p.bankrupt);
  if (alive.length <= 1 && !s.debt) {
    s.status = "finished";
    s.winner = alive.map((p) => p.id);
    s.trades = [];
    addLog(s, alive[0] ? `${alive[0].name} ganó la partida.` : "Todos los viajeros quedaron en quiebra.");
  }
}
function charge(s: Game, p: Player, amount: number, creditor: string | null) {
  if (amount <= 0) return;
  const debt = { amount, creditor, payer: p.id };
  if (s.debt) s.debts = [...(s.debts ?? []), debt];
  else s.debt = debt;
  addLog(
    s,
    `${p.name} debe pagar $${amount} a ${s.players.find((x) => x.id === creditor)?.name ?? "el Banco"}.`,
    { type: "payment", player: p.id },
  );
}
function jail(
  s: Game,
  p: Player,
  detention: "prison" | "oceania" = "prison",
  turns = 3,
) {
  const from = p.position;
  p.position = detention === "prison" ? 30 : 10;
  p.detention = detention;
  p.jailed = turns;
  p.salary = 0;
  if (detention === "prison") {
    charge(s, p, PRISON_BAIL, null);
    const debt = (s.debts?.length ? s.debts[s.debts.length - 1] : s.debt)!;
    debt.reason = "bail";
  }
  s.extra = false;
  s.doubles = 0;
  s.phase = "end";
  s.motion = {
    serial: (s.motion?.serial ?? 0) + 1,
    player: p.id,
    path: [p.position],
  };
  addLog(
    s,
    `${p.name} va a ${detention === "prison" ? "Cárcel" : "Deportado"} por ${turns} turnos.`,
    { type: "move", player: p.id, path: [p.position], from, teleport: true },
  );
}
function move(s: Game, p: Player, steps: number) {
  const from = p.position;
  const path: number[] = [];
  for (let i = 0; i < steps; i++) {
    p.position = (p.position + 1) % 40;
    path.push(p.position);
    if (p.position === 0) {
      p.salary = (p.salary ?? 0) + SALARY;
      addLog(s, `${p.name} pasó por Salida: puede cobrar $${SALARY} antes de terminar su turno.`);
    }
  }
  s.motion = { serial: (s.motion?.serial ?? 0) + 1, player: p.id, path };
  if (path.length)
    addLog(
      s,
      `${p.name} avanza ${steps} casillas hasta ${BOARD[p.position].name}.`,
      { type: "move", player: p.id, path, from },
    );
}
function land(s: Game, p: Player, now: number) {
  const b = BOARD[p.position];
  addLog(s, `${p.name} llegó a ${b.name}.`, { type: "log", player: p.id, square: b.id });
  s.phase = "end";
  if (b.kind === "go-oceania") {
    jail(s, p);
    return;
  }
  if (b.kind === "rest") {
    return;
  }
  if (b.kind === "tax") {
    charge(s, p, b.tax ?? 0, null);
    return;
  }
  if (b.price) {
    const a = s.properties[b.id];
    if (!a.owner) s.phase = "buy";
    else if (a.owner !== p.id) {
      const owner = s.players.find((x) => x.id === a.owner)!;
      let amount = rent(s, b.id, s.dice[0] + s.dice[1]);
      if (amount && b.kind === "country" && !a.buildings && owner.rentBonus) {
        amount *= 2; owner.rentBonus = false;
      }
      charge(s, p, amount, a.owner);
    }
    return;
  }
  if (b.kind === "email" || b.kind === "sms") {
    const deck = s.decks[b.kind];
    const index = deck.shift();
    requireRule(index !== undefined, "Mazo vacío.");
    const c = CARDS[b.kind][index];
    s.lastCard = c.text;
    addLog(s, `${p.name} · ${b.name}: ${c.text}`, {
      type: "card",
      player: p.id,
      deck: b.kind,
    });
    if (c.kind === "acquisition") { p.acquisitionCard = true; return; }
    if (c.kind === "pass") {
      p.passes.push(b.kind);
      return;
    }
    deck.push(index);
    if (c.kind === "money") {
      if (c.amount >= 0) credit(p, c.amount);
      else charge(s, p, -c.amount, null);
    }
    if (c.kind === "jail") {
      if (c.fine) charge(s, p, c.fine, null);
      jail(s, p, c.detention ?? "prison", c.turns ?? 3);
    }
    if (c.kind === "bonus") p.rentBonus = true;
    if (c.kind === "collect") {
      s.choice = { player: p.id, kind: "collect", amount: c.amount };
      p.skipTurns = (p.skipTurns ?? 0) + (c.skip ?? 0);
      if (c.skip) s.extra = false;
    }
    if (c.kind === "everyone") {
      for (const other of s.players.filter((x) => !x.bankrupt)) {
        if (c.toPlayer === false) charge(s, other, c.amount, null);
        else if (other.id !== p.id) {
          if (c.amount < 0) charge(s, other, -c.amount, p.id);
          else charge(s, p, c.amount, other.id);
        }
      }
    }
    if (c.kind === "refund" || c.kind === "expropriate") {
      const owned = BOARD.filter((x) => s.properties[x.id]?.owner === p.id);
      const target = c.kind === "refund" ? owned.find((x) => x.id === p.lastBought)
        : owned.sort((a, b) => b.price - a.price || a.id - b.id)[0];
      if (target) {
        // Sell the entire block's buildings to preserve even development.
        for (const peer of group(target.id)) {
          const property = s.properties[peer.id];
          if (property.owner === p.id) {
            credit(p, property.buildings * peer.buildCost / 2); property.buildings = 0;
          }
        }
        const property = s.properties[target.id];
        credit(p, c.kind === "refund" ? (property.mortgaged ? 0 : target.price / 2) : target.rents[0]);
        property.owner = null; property.mortgaged = false;
        addLog(s, `${p.name} devuelve ${target.name} al Banco por una carta.`);
        if (c.kind === "expropriate") s.auctionQueue = [...(s.auctionQueue ?? []), target.id];
      }
    }
    if (c.kind === "airline") {
      const target = BOARD.filter((x) => x.kind === "airline" && !s.properties[x.id].owner)
        .sort((a,b) => (a.id - p.position + 40) % 40 - (b.id - p.position + 40) % 40)[0];
      if (target) {
        move(s, p, (target.id - p.position + 40) % 40);
        charge(s, p, target.price + 5000, null);
        const debt = (s.debts?.length ? s.debts[s.debts.length - 1] : s.debt)!;
        debt.reason = "purchase"; debt.square = target.id;
      }
    }
    if (c.kind === "repairs") {
      const amount = Object.values(s.properties)
        .filter((a) => a.owner === p.id)
        .reduce(
          (v, a) =>
            v + (a.buildings === 5 ? c.hotel : a.buildings * c.restaurant),
          0,
        );
      charge(s, p, amount, null);
    }
    if (c.kind === "move") {
      const steps = (c.target - p.position + BOARD.length) % BOARD.length;
      if (steps > 0) {
        move(s, p, steps);
        land(s, p, now);
      }
      if (c.fine) charge(s, p, c.fine, null);
      if (c.skip) { p.skipTurns = (p.skipTurns ?? 0) + c.skip; s.extra = false; }
    }
    openNextAuction(s, now);
  }
}
function eliminate(s: Game, p: Player, creditor: string | null) {
  const recipient = s.players.find((x) => x.id === creditor && !x.bankrupt);
  for (const [id, property] of Object.entries(s.properties))
    if (property.owner === p.id) { credit(p, property.buildings * BOARD[Number(id)].buildCost / 2); property.buildings = 0; }
  if (recipient) credit(recipient, p.money);
  p.money = 0;
  p.bankrupt = true;
  p.eliminatedAt = s.version;
  s.eliminated = [...(s.eliminated ?? []), p.id];
  s.trades = s.trades.filter((t) => t.from !== p.id && t.to !== p.id);
  if (s.choice?.player === p.id) s.choice = null;
  for (const [id, a] of Object.entries(s.properties))
    if (a.owner === p.id) {
      a.owner = recipient?.id ?? null;
      if (recipient && a.mortgaged) {
        a.inheritanceTurn = (s.turnNumber ?? 0) + (s.players[s.turn].id === p.id ? 1 : 0);
        s.debts = [...(s.debts ?? []), { payer: recipient.id, amount: BOARD[Number(id)].price * 0.1, creditor: null, reason: "inheritance" }];
      }
      if (!recipient) {
        s.auctionQueue = [...(s.auctionQueue ?? []), Number(id)];
        a.buildings = 0;
        a.mortgaged = false;
      }
    }
  for (const deck of p.passes)
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
  p.passes = [];
  s.debts = (s.debts ?? []).filter((d) => d.payer !== p.id).map((d) => ({ ...d, creditor: d.creditor === p.id ? null : d.creditor }));
  s.debt = s.debts.shift() ?? null;
  if (p.acquisitionCard) { s.decks.email.push(CARDS.email.findIndex((c) => c.kind === "acquisition")); p.acquisitionCard = false; }
  addLog(s, `${p.name} se declaró en quiebra.`);
  winner(s);
}
export function engine(
  state: Game,
  action: Action,
  playerId: string,
  ctx: Context,
): Game {
  const timed = finishByTime(state, ctx.now);
  if (timed !== state) {
    if (timed.status === "finished" || action.type === "auction-expire") return timed;
    throw new Error("La subasta acaba de terminar. Espera la actualización de la sala.");
  }
  const s = structuredClone(state),
    p = s.players.find((x) => x.id === playerId);
  requireRule(
    p &&
      (!p.bankrupt ||
        (p.id === s.host &&
          (action.type === "skip" || action.type === "expel"))),
    "Jugador no disponible.",
  );
  if (action.type === "color") {
    requireRule(s.status === "lobby", "La partida ya inició.");
    requireRule(
      COLORS.includes(action.color) &&
        !s.players.some((x) => x.id !== p.id && x.color === action.color),
      "Color no disponible.",
    );
    p.color = action.color;
    return s;
  }
  if (action.type === "start") {
    requireRule(
      s.status === "lobby" && p.id === s.host,
      "Solo el anfitrión puede iniciar.",
    );
    requireRule(s.players.length >= 2, "Se necesitan al menos dos jugadores.");
    s.status = "playing";
    s.opening = { candidates: s.players.map((x) => x.id), rolls: {}, round: 1 };
    s.decks = structuredClone(ctx.shuffled);
    s.turnAt = ctx.now;
    s.endsAt = s.duration ? ctx.now + s.duration * 60000 : null;
    addLog(s, "Cada viajero tira un dado: el número mayor inicia. Los empates se repiten.");
    return s;
  }
  requireRule(s.status === "playing", "La partida no está activa.");
  if (s.opening) {
    const opening = s.opening;
    let roller = p;
    let value = ctx.dice[0];
    if (action.type === "skip" || action.type === "expel") {
      requireRule(p.id === s.host && ctx.inactive, "Solo el anfitrión puede actuar tras 90 segundos de inactividad.");
      roller = s.players.find((x) => x.id === waitingPlayer(s))!; value = 0;
      if (action.type === "expel") {
        eliminate(s, roller, null); opening.candidates = opening.candidates.filter((id) => id !== roller.id);
        delete opening.rolls[roller.id];
        if (s.players.filter((x) => !x.bankrupt).length <= 1) { s.opening = null; return s; }
      }
    } else requireRule(action.type === "opening-roll", "Primero se decide quién inicia.");
    if (action.type !== "expel") {
      requireRule(opening.candidates.includes(roller.id) && opening.rolls[roller.id] === undefined, "Ya tiraste o no participas en este desempate.");
      opening.rolls[roller.id] = value;
      addLog(s, `${roller.name} sacó ${value} para elegir la salida.`, { type: "roll", player: roller.id, dice: [value, 0] });
    }
    if (opening.candidates.every((id) => opening.rolls[id] !== undefined)) {
      const max = Math.max(...Object.values(opening.rolls));
      const tied = opening.candidates.filter((id) => opening.rolls[id] === max);
      if (tied.length === 1) {
        s.turn = s.players.findIndex((x) => x.id === tied[0]); s.opening = null; s.turnAt = ctx.now;
        addLog(s, `${s.players[s.turn].name} inicia el viaje.`);
      } else { s.opening = { candidates: tied, rolls: {}, round: opening.round + 1 }; addLog(s, "Empate: vuelven a tirar los finalistas."); }
    }
    return s;
  }
  if (s.auction) {
    requireRule(["bid", "fold", "auction-expire"].includes(action.type), "Resuelve la subasta antes de continuar.");
    const a = s.auction;
    requireRule(!p.jailed || p.detention !== "prison", "En la cárcel no puedes participar en subastas.");
    if (action.type === "bid") {
      if (a.buildingOptions) {
        const square = action.square ?? a.buildingOptions[p.id]?.[0];
        requireRule(square !== undefined && a.buildingOptions[p.id]?.includes(square), "No puedes construir en ese país.");
        requireRule(action.amount >= BOARD[square].buildCost, "La oferta debe cubrir el costo de construcción.");
        a.square = square;
      }
      requireRule(!a.passed.includes(p.id) && Number.isSafeInteger(action.amount) && action.amount >= a.amount + 500 && action.amount <= p.money, "Oferta inválida: aumenta al menos $500 y usa solo tu saldo disponible.");
      a.amount = action.amount; a.bidder = p.id; a.endsAt = ctx.now + 20000;
      addLog(s, `${p.name} ofrece $${action.amount} por ${BOARD[a.square].name}.`);
    } else if (action.type === "fold") {
      requireRule(p.id !== a.bidder && !a.passed.includes(p.id), "No puedes retirarte de tu oferta ganadora.");
      a.passed.push(p.id);
    } else requireRule(ctx.now >= a.endsAt, "La subasta aún no termina.");
    const participants = s.players.filter((x) => !x.bankrupt && !(x.jailed && x.detention === "prison") && (!a.buildingOptions || a.buildingOptions[x.id]?.length));
    if (ctx.now >= a.endsAt || participants.every((x) => a.passed.includes(x.id) || x.id === a.bidder)) closeAuction(s, ctx.now);
    return s;
  }
  if (action.type === "salary") {
    requireRule(s.players[s.turn].id === p.id && (p.salary ?? 0) > 0, "No tienes sueldo pendiente en este turno.");
    credit(p, p.salary!); addLog(s, `${p.name} cobró $${p.salary} de sueldo.`); p.salary = 0; return s;
  }
  if (action.type === "collect") {
    requireRule(s.choice?.player === p.id, "No hay una elección pendiente.");
    const other = s.players.find((x) => x.id === action.target && x.id !== p.id && !x.bankrupt);
    requireRule(other, "Elige a otro viajero activo.");
    charge(s, other, s.choice.amount, p.id); s.choice = null; return s;
  }
  if (action.type === "acquire") {
    requireRule(p.acquisitionCard && !s.debt && !(p.jailed && p.detention === "prison"), "No puedes utilizar el permiso ahora.");
    const b = BOARD[action.square], a = s.properties[action.square];
    requireRule(b?.kind === "country" && a.owner !== p.id && group(b.id).every((x) => x.id === b.id || s.properties[x.id].owner === p.id) && !group(b.id).some((x) => s.properties[x.id].buildings), "Elige el último país que te falte de un bloque sin edificios.");
    const price = a.owner ? b.rents[0] : b.price - 1000;
    pay(p, price, action.bills);
    const oldOwner = s.players.find((x) => x.id === a.owner); if (oldOwner) credit(oldOwner, price);
    a.owner = p.id; delete a.inheritanceTurn; p.acquisitionCard = false; p.lastBought = b.id;
    s.decks.email.push(CARDS.email.findIndex((c) => c.kind === "acquisition"));
    addLog(s, `${p.name} completó su bloque adquiriendo ${b.name} por $${price}.`, { type: "purchase", player: p.id, square: b.id }); return s;
  }
  if (action.type === "skip" || action.type === "expel") {
    requireRule(
      p.id === s.host && ctx.inactive,
      "Solo el anfitrión puede actuar tras 90 segundos de inactividad.",
    );
    const absent = s.players.find((x) => x.id === waitingPlayer(s))!;
    if (action.type === "expel") {
      eliminate(s, absent, s.debt?.creditor ?? null);
      if (s.status === "playing" && absent.id === s.players[s.turn].id) advanceAfterElimination(s, ctx.now);
      openNextAuction(s, ctx.now);
    } else {
      requireRule(
        !s.debt,
        "Hay una deuda pendiente; solo se puede declarar la quiebra.",
      );
      if (s.phase === "roll" && (absent.jailed || absent.skipTurns)) waitTurn(s, absent);
      if (s.phase === "buy") s.auctionQueue = [...(s.auctionQueue ?? []), absent.position];
      s.choice = null;
      addLog(s, `Se saltó el turno de ${absent.name}.`);
      nextTurn(s, ctx.now);
      openNextAuction(s, ctx.now);
    }
    return s;
  }
  if (action.type === "reject") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(
      t && (t.from === p.id || t.to === p.id),
      "Trato no disponible.",
    );
    s.trades = s.trades.filter((x) => x.id !== action.trade);
    return s;
  }
  if (action.type === "accept") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(t && t.to === p.id && !s.debt, "No puedes aceptar este trato.");
    const from = s.players.find((x) => x.id === t.from);
    requireRule(from && !from.bankrupt, "El oferente ya no está disponible.");
    validateTrade(s, from, p, t.give, t.take, t.giveMoney, t.takeMoney);
    pay(from, t.giveMoney); pay(p, t.takeMoney); credit(from, t.takeMoney); credit(p, t.giveMoney);
    for (const id of t.give) { s.properties[id].owner = p.id; delete s.properties[id].inheritanceTurn; }
    for (const id of t.take) { s.properties[id].owner = from.id; delete s.properties[id].inheritanceTurn; }
    if (t.give.length) p.lastBought = t.give[t.give.length - 1];
    if (t.take.length) from.lastBought = t.take[t.take.length - 1];
    s.trades = [];
    addLog(s, `${p.name} aceptó el trato de ${from.name}.`);
    return s;
  }
  if (action.type === "change") {
    exchange(p, action.denomination);
    return s;
  }
  if (action.type === "trade") {
    const to = s.players.find((x) => x.id === action.to);
    requireRule(
      to && !to.bankrupt && to.id !== p.id && !s.debt,
      "No puedes ofrecer este trato.",
    );
    validateTrade(
      s,
      p,
      to,
      action.give,
      action.take,
      action.giveMoney,
      action.takeMoney,
    );
    s.trades = [
      ...s.trades.filter((t) => t.from !== p.id),
      { ...action, id: `${s.version}-${p.id}`, from: p.id },
    ];
    addLog(s, `${p.name} propone a ${to.name}: ofrece $${action.giveMoney} y ${action.give.map((id) => BOARD[id].name).join(", ") || "ninguna propiedad"}; pide $${action.takeMoney} y ${action.take.map((id) => BOARD[id].name).join(", ") || "ninguna propiedad"}.`);
    return s;
  }
  if ("square" in action && action.type !== "bid") {
    const err = assetError(s, p, action.square, action.type);
    requireRule(!err, err ?? "Acción ilegal.");
    const a = s.properties[action.square],
      b = BOARD[action.square];
    if (action.type === "build") {
      const options = buildingBidders(s, action.square);
      if (Object.keys(options).length > 1) {
        s.auction = { square: action.square, amount: 0, bidder: null, passed: [], endsAt: ctx.now + 30000, buildingOptions: options };
        addLog(s, "Queda una pieza y varios viajeros pueden construir: comienza la subasta del edificio."); return s;
      }
      a.buildings++;
      pay(p, b.buildCost, action.bills);
    }
    if (action.type === "sell") {
      a.buildings--;
      credit(p, b.buildCost / 2);
    }
    if (action.type === "sell-group") {
      for (const peer of group(action.square)) {
        const property = s.properties[peer.id];
        if (property.owner === p.id) { credit(p, property.buildings * peer.buildCost / 2); property.buildings = 0; }
      }
    }
    if (action.type === "mortgage") {
      a.mortgaged = true;
      delete a.inheritanceTurn;
      credit(p, b.mortgage);
    }
    if (action.type === "redeem") {
      a.mortgaged = false;
      pay(p, redemptionCost(s, action.square), action.bills);
    }
    if (action.type === "return") {
      credit(p, a.mortgaged ? 0 : b.price / 2);
      a.owner = null;
      a.mortgaged = false;
      delete a.inheritanceTurn;
    }
    const labels = {
      build: "construyó en",
      sell: "vendió un edificio de",
      "sell-group": "vendió los edificios del bloque de",
      mortgage: "hipotecó",
      redeem: "deshipotecó",
      return: "devolvió al Banco",
    };
    addLog(s, `${p.name} ${labels[action.type]} ${b.name}.`);
    return s;
  }
  const debtor = s.debt?.payer ?? s.players[s.turn].id;
  if (action.type === "settle") {
    requireRule(debtor === p.id, "Este pago le corresponde a otro jugador.");
    requireRule(
      s.debt && p.money >= s.debt.amount,
      "No tienes saldo para liquidar la deuda.",
    );
    const d = s.debt;
    s.debt = (s.debts ?? []).shift() ?? null;
    pay(p, d.amount, action.bills);
    const recipient = s.players.find((x) => x.id === d.creditor);
    if (recipient && !recipient.bankrupt) credit(recipient, d.amount);
    if (d.reason === "purchase" && d.square !== undefined) {
      s.properties[d.square].owner = p.id; p.lastBought = d.square;
      addLog(s, `${p.name} compró ${BOARD[d.square].name} por una carta.`, { type: "purchase", player: p.id, square: d.square });
    }
    openNextAuction(s, ctx.now); winner(s);
    addLog(
      s,
      `${p.name} pagó $${d.amount} a ${recipient?.name ?? "el Banco"}.`,
      { type: "payment", player: p.id },
    );
    return s;
  }
  if (action.type === "bankrupt") {
    requireRule(s.debt && debtor === p.id, "No tienes una deuda pendiente.");
    requireRule(
      liquidationValue(s, p) < s.debt.amount,
      "Puedes cubrir la deuda vendiendo o hipotecando.",
    );
    eliminate(s, p, s.debt.creditor);
    if (s.status === "playing" && s.players[s.turn].id === p.id) advanceAfterElimination(s, ctx.now);
    openNextAuction(s, ctx.now);
    return s;
  }
  if (action.type === "pass") {
    requireRule(p.jailed > 0 && p.passes.length > 0, "No tienes un pase que usar.");
    const deck = p.passes.shift()!;
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
    if (s.debt?.reason === "bail" && s.debt.payer === p.id) s.debt = (s.debts ?? []).shift() ?? null;
    s.debts = (s.debts ?? []).filter((d) => !(d.reason === "bail" && d.payer === p.id));
    release(s, p); addLog(s, `${p.name} utilizó su pase diplomático.`); return s;
  }
  requireRule(s.players[s.turn].id === p.id, "Espera tu turno.");
  requireRule(!s.choice, "Elige primero al viajero indicado en la carta.");
  requireRule(!s.debt, "Liquida tu deuda antes de continuar.");
  if (action.type === "bail") {
    requireRule(p.jailed > 0 && p.detention === "oceania", "La multa solo permite salir de Deportado.");
    pay(p, DEPORTATION_FINE, action.bills); release(s, p);
    addLog(s, `${p.name} pagó $${DEPORTATION_FINE} y regresó a Salida sin sueldo.`); return s;
  }
  if (action.type === "wait") {
    requireRule(s.phase === "roll" && (p.jailed > 0 || (p.skipTurns ?? 0) > 0), "No tienes un turno de castigo pendiente.");
    waitTurn(s, p); return s;
  }
  if (action.type === "roll") {
    requireRule(s.phase === "roll", "Ya tiraste los dados.");
    s.dice = ctx.dice;
    s.lastCard = null;
    const double = ctx.dice[0] === ctx.dice[1];
    addLog(
      s,
      `${p.name} tiró ${ctx.dice.join(" + ")} = ${ctx.dice[0] + ctx.dice[1]}.`,
      { type: "roll", player: p.id, dice: ctx.dice },
    );
    if (p.jailed || p.skipTurns) { waitTurn(s, p); return s; }
    s.doubles = double ? s.doubles + 1 : 0;
    s.extra = double;
    if (s.doubles === 3) {
      jail(s, p, "oceania");
      return s;
    }
    move(s, p, ctx.dice[0] + ctx.dice[1]);
    land(s, p, ctx.now);
    return s;
  }
  if (action.type === "buy" || action.type === "decline") {
    requireRule(s.phase === "buy", "No hay compra pendiente.");
    if (action.type === "buy") {
      const b = BOARD[p.position],
        a = s.properties[b.id];
      requireRule(
        a && !a.owner && p.money >= b.price,
        "La propiedad no está disponible o falta saldo.",
      );
      pay(p, b.price, action.bills);
      a.owner = p.id;
      p.lastBought = b.id;
      addLog(s, `${p.name} compró ${b.name} por $${b.price}.`, {
        type: "purchase",
        player: p.id,
        square: b.id,
      });
    }
    s.phase = "end";
    if (action.type === "decline") {
      s.auctionQueue = [...(s.auctionQueue ?? []), p.position]; openNextAuction(s, ctx.now);
    }
    return s;
  }
  if (action.type === "end") {
    requireRule(s.phase === "end", "Resuelve la tirada o la compra primero.");
    if (s.extra) {
      s.phase = "roll";
      s.extra = false;
      s.turnAt = ctx.now;
    } else nextTurn(s, ctx.now);
    return s;
  }
  throw new Error("Acción desconocida.");
}
function validateTrade(
  s: Game,
  from: Player,
  to: Player,
  give: number[],
  take: number[],
  gm: number,
  tm: number,
) {
  requireRule(!(from.jailed && from.detention === "prison") && !(to.jailed && to.detention === "prison"), "No se puede negociar con jugadores en la cárcel.");
  requireRule(
    Number.isSafeInteger(gm) &&
      Number.isSafeInteger(tm) &&
      gm >= 0 &&
      tm >= 0 &&
      from.money >= gm &&
      to.money >= tm,
    "Dinero del trato inválido.",
  );
  requireRule(give.length + take.length + gm + tm > 0, "El trato está vacío.");
  requireRule(
    new Set([...give, ...take]).size === give.length + take.length,
    "Propiedad repetida.",
  );
  for (const [ids, owner] of [
    [give, from.id],
    [take, to.id],
  ] as const)
    for (const id of ids) {
      const a = s.properties[id];
      requireRule(
        a &&
          a.owner === owner &&
          !a.buildings &&
          !group(id).some((b) => s.properties[b.id].buildings),
        "Las propiedades del trato deben pertenecer al jugador y tener todo su grupo sin edificios.",
      );
    }
}

function release(s: Game, p: Player) {
  if (p.detention === "oceania") {
    const from = p.position; p.position = 0;
    addLog(s, `${p.name} regresa a Salida sin cobrar sueldo.`, { type: "move", player: p.id, from, path: [0], teleport: true });
  }
  p.jailed = 0; delete p.detention;
}
function waitTurn(s: Game, p: Player) {
  if (p.jailed) {
    p.jailed--; addLog(s, `${p.name} cumple un turno de castigo; quedan ${p.jailed}.`);
    if (!p.jailed) release(s, p);
  } else { p.skipTurns = Math.max(0, (p.skipTurns ?? 0) - 1); addLog(s, `${p.name} descansa; quedan ${p.skipTurns} turnos.`); }
  s.phase = "end"; s.extra = false; s.doubles = 0;
}
function advanceAfterElimination(s: Game, now: number) {
  const debt = s.debt; nextTurn(s, now); s.debt = debt;
}
function openNextAuction(s: Game, now: number) {
  if (s.auction || s.debt || s.status !== "playing") return;
  const square = (s.auctionQueue ?? []).shift();
  if (square === undefined) return;
  s.auction = { square, amount: 0, bidder: null, passed: [], endsAt: now + 30000 };
  addLog(s, `Subasta de ${BOARD[square].name}: primera oferta desde $500. Todos pueden participar.`);
}
function closeAuction(s: Game, now: number) {
  const auction = s.auction; if (!auction) return;
  if (auction.bidder) {
    const buyer = s.players.find((p) => p.id === auction.bidder)!;
    pay(buyer, auction.amount);
    if (auction.buildingOptions) s.properties[auction.square].buildings++;
    else { s.properties[auction.square].owner = buyer.id; buyer.lastBought = auction.square; }
    addLog(s, `${buyer.name} ganó la subasta ${auction.buildingOptions ? "del edificio en" : "de"} ${BOARD[auction.square].name} por $${auction.amount}.`, { type: "purchase", player: buyer.id, square: auction.square });
  } else addLog(s, `Sin ofertas: ${BOARD[auction.square].name} permanece en el Banco.`);
  s.auction = null; openNextAuction(s, now);
}

export function waitingPlayer(s: Game): string {
  return s.debt?.payer ?? s.choice?.player ?? s.opening?.candidates.find((id) => s.opening?.rolls[id] === undefined) ?? s.players[s.turn].id;
}
````

## lib/game/money.ts

````typescript
import type { Player } from "./types";
export const DENOMINATIONS = [50000, 10000, 5000, 2000, 1000, 500, 100, 50, 10, 1] as const;
export type Bills = Record<string, number>;
export const INITIAL_BILLS: Bills = {
  50000: 2, 10000: 2, 5000: 2, 2000: 1, 1000: 2, 500: 1,
};
export const totalBills = (bills: Bills) =>
  Object.entries(bills).reduce(
    (sum, [value, count]) => sum + Number(value) * count,
    0,
  );
export function change(amount: number): Bills {
  const result: Bills = {};
  for (const value of DENOMINATIONS) {
    result[value] = Math.floor(amount / value);
    amount %= value;
  }
  return result;
}
export function wallet(player: Player): Bills {
  return player.bills && totalBills(player.bills) === player.money
    ? { ...player.bills }
    : change(player.money);
}
export function pay(player: Player, amount: number, selected?: Bills) {
  if (!Number.isSafeInteger(amount) || amount < 0 || player.money < amount)
    throw new Error("Saldo insuficiente.");
  const held = wallet(player);
  if (!selected) {
    player.money -= amount;
    player.bills = change(player.money);
    return;
  }
  for (const [value, count] of Object.entries(selected))
    if (
      !DENOMINATIONS.some((d) => String(d) === value) ||
      !Number.isSafeInteger(count) ||
      count < 0 ||
      count > (held[value] ?? 0)
    )
      throw new Error("Los billetes seleccionados no están disponibles.");
  const tender = totalBills(selected);
  if (tender < amount)
    throw new Error("Selecciona suficientes billetes para pagar.");
  for (const value of DENOMINATIONS)
    held[value] = (held[value] ?? 0) - (selected[value] ?? 0);
  for (const [value, count] of Object.entries(change(tender - amount)))
    held[value] = (held[value] ?? 0) + count;
  player.money -= amount;
  player.bills = held;
}
export function exchange(player: Player, value: number) {
  const index = DENOMINATIONS.indexOf(value as (typeof DENOMINATIONS)[number]);
  const held = wallet(player);
  if (index < 0 || index === DENOMINATIONS.length - 1 || !held[value])
    throw new Error("No puedes cambiar ese billete.");
  held[value]--;
  let rest = value;
  for (const smaller of DENOMINATIONS.slice(index + 1)) {
    const count = Math.floor(rest / smaller);
    held[smaller] = (held[smaller] ?? 0) + count;
    rest %= smaller;
  }
  player.bills = held;
}

export function credit(player: Player, amount: number) {
  if (!Number.isSafeInteger(amount) || amount < 0) throw new Error("Abono inválido.");
  const held = wallet(player);
  for (const [value, count] of Object.entries(change(amount))) held[value] = (held[value] ?? 0) + count;
  player.money += amount; player.bills = held;
}
````

## lib/game/rules.ts

````typescript
import { BOARD, HOUSE_SUPPLY, HOTEL_SUPPLY } from "./board";
import type { Game, Player } from "./types";
export const group = (id: number) =>
  BOARD.filter((b) => b.group && b.group === BOARD[id].group);
export const complete = (s: Game, id: number, owner: string) =>
  group(id).length > 0 &&
  group(id).every((b) => s.properties[b.id].owner === owner);
export function rent(s: Game, id: number, dice: number): number {
  const b = BOARD[id],
    p = s.properties[id];
  if (!p?.owner || p.mortgaged || s.players.some((x) => x.id === p.owner && x.jailed > 0 && x.detention === "prison")) return 0;
  if (b.kind === "country")
    return (
      b.rents[p.buildings] *
      (p.buildings === 0 && complete(s, id, p.owner) ? 2 : 1)
    );
  const count = BOARD.filter(
    (x) => x.kind === b.kind && s.properties[x.id]?.owner === p.owner,
  ).length;
  return b.kind === "utility" ? dice * b.rents[count - 1] : b.rents[count - 1];
}
export function assetError(
  s: Game,
  player: Player,
  id: number,
  type: string,
): string | null {
  const b = BOARD[id],
    p = s.properties[id];
  if (!b || !p || p.owner !== player.id)
    return "Esta propiedad no te pertenece.";
  if (player.bankrupt) return "Ya no participas en la partida.";
  if (s.auction) return "Termina la subasta primero.";
  if (s.opening) return "Primero se elige quién inicia.";
  if (player.jailed > 0 && player.detention === "prison" &&
      !(s.debt && (s.debt.payer ?? s.players[s.turn].id) === player.id && ["sell", "sell-group", "mortgage", "return"].includes(type)))
    return "En la cárcel no puedes administrar propiedades.";
  const peers = group(id),
    built = peers.some((x) => s.properties[x.id].buildings > 0);
  if (type === "build") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (
      !complete(s, id, player.id) ||
      peers.some((x) => s.properties[x.id].mortgaged)
    )
      return "Necesitas todo el grupo sin hipotecas.";
    if (p.buildings >= 5) return "Ya tiene un hotel.";
    if (peers.some((x) => s.properties[x.id].buildings < p.buildings))
      return "Construye primero en la propiedad con menos edificios.";
    const stock = bankStock(s);
    if (p.buildings < 4 && stock.houses <= 0) return "El Banco no tiene casas disponibles.";
    if (p.buildings === 4 && stock.hotels <= 0) return "El Banco no tiene hoteles disponibles.";
    if (player.money < b.buildCost) return "Saldo insuficiente.";
  } else if (type === "sell") {
    if (p.buildings === 5 && bankStock(s).houses < 4) return "El Banco necesita cuatro casas para deshacer este hotel.";
    if (!p.buildings) return "No hay edificios para vender.";
    if (peers.some((x) => s.properties[x.id].buildings > p.buildings))
      return "Vende primero en la propiedad con más edificios.";
  } else if (type === "sell-group") {
    if (!built) return "No hay edificios en este bloque.";
  } else if (type === "mortgage") {
    if (p.mortgaged) return "Ya está hipotecada.";
    if (built) return "Vende todos los edificios del grupo primero.";
  } else if (type === "redeem") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (!p.mortgaged) return "No está hipotecada.";
    if (player.money < redemptionCost(s, id))
      return "Saldo insuficiente.";
  } else if (type === "return" && built)
    return "Vende todos los edificios del grupo primero.";
  return null;
}
export const netWorth = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? b.price - (a.mortgaged ? b.mortgage : 0) + a.buildings * b.buildCost
        : 0)
    );
  }, 0);
export const liquidationValue = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? (a.mortgaged ? 0 : b.mortgage) + (a.buildings * b.buildCost) / 2
        : 0)
    );
  }, 0);

export function ranking(s: Game) {
  const score = (p: Player) =>
    netWorth(s, p) -
    ([...(s.debt ? [s.debt] : []), ...(s.debts ?? [])].filter((d) => (d.payer ?? s.players[s.turn].id) === p.id).reduce((sum, d) => sum + d.amount, 0));
  const ordered = [...s.players].sort((a, b) => {
    if (a.bankrupt !== b.bankrupt) return a.bankrupt ? 1 : -1;
    if (a.bankrupt)
      return (
        (s.eliminated ?? []).indexOf(b.id) -
          (s.eliminated ?? []).indexOf(a.id) ||
        (b.eliminatedAt ?? 0) - (a.eliminatedAt ?? 0)
      );
    return score(b) - score(a);
  });
  let previousRank = 0;
  return ordered.map((player, i) => {
    const before = ordered[i - 1];
    const tied =
      before &&
      !player.bankrupt &&
      !before.bankrupt &&
      score(player) === score(before);
    const place = tied ? previousRank : i + 1;
    previousRank = place;
    return { player, place, score: score(player) };
  });
}

export const bankStock = (s: Game) => ({
  houses: HOUSE_SUPPLY - Object.values(s.properties).reduce((n, p) => n + (p.buildings < 5 ? p.buildings : 0), 0),
  hotels: HOTEL_SUPPLY - Object.values(s.properties).filter((p) => p.buildings === 5).length,
});
export const redemptionCost = (s: Game, id: number) => BOARD[id].mortgage +
  (s.properties[id].inheritanceTurn !== undefined && s.properties[id].inheritanceTurn === (s.turnNumber ?? 0) ? 0 : Math.ceil(BOARD[id].mortgage / 10));

export function buildingBidders(s: Game, id: number): Record<string, number[]> {
  const hotels = s.properties[id]?.buildings === 4;
  const stock = bankStock(s);
  if ((hotels ? stock.hotels : stock.houses) !== 1) return {};
  const result: Record<string, number[]> = {};
  for (const p of s.players.filter((p) => !p.bankrupt)) {
    const options = BOARD.filter((b) => b.kind === "country" &&
      s.properties[b.id].owner === p.id &&
      (hotels ? s.properties[b.id].buildings === 4 : s.properties[b.id].buildings < 4) &&
      !assetError(s, p, b.id, "build")).map((b) => b.id);
    if (options.length) result[p.id] = options;
  }
  return result;
}
````

## lib/game/shuffle.ts

````typescript
/** Fisher–Yates: randomness is supplied by the authoritative server. */
export function shuffleDeck(
  size: number,
  nextIndex: (exclusiveMax: number) => number,
): number[] {
  const cards = Array.from({ length: size }, (_, i) => i);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = nextIndex(i + 1);
    if (!Number.isInteger(j) || j < 0 || j > i)
      throw new Error("Índice aleatorio inválido.");
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
````

## lib/game/types.ts

````typescript
export type SquareKind =
  | "start"
  | "country"
  | "airline"
  | "utility"
  | "email"
  | "sms"
  | "tax"
  | "oceania"
  | "rest"
  | "go-oceania";
export interface Square {
  id: number;
  name: string;
  kind: SquareKind;
  price: number;
  mortgage: number;
  flag?: string;
  group?: string;
  color?: string;
  rents: number[];
  buildCost: number;
  tax?: number;
}
export interface Property {
  owner: string | null;
  buildings: number;
  mortgaged: boolean;
  inheritanceTurn?: number;
}
export interface Player {
  id: string;
  name: string;
  color: string;
  money: number;
  position: number;
  jailed: number;
  bankrupt: boolean;
  passes: ("email" | "sms")[];
  bills?: Record<string, number>;
  detention?: "prison" | "oceania";
  eliminatedAt?: number;
  salary?: number;
  skipTurns?: number;
  rentBonus?: boolean;
  acquisitionCard?: boolean;
  lastBought?: number;

}
export interface Trade {
  id: string;
  from: string;
  to: string;
  give: number[];
  take: number[];
  giveMoney: number;
  takeMoney: number;
}
export interface GameEvent {
  id: number;
  type: "log" | "roll" | "card" | "purchase" | "move" | "payment";
  text: string;
  player?: string;
  dice?: [number, number];
  square?: number;
  deck?: "email" | "sms";
  path?: number[];
  from?: number;
  teleport?: boolean;
}
export interface Game {
  id: string;
  version: number;
  rulesVersion?: number;
  host: string;
  status: "lobby" | "playing" | "finished";
  players: Player[];
  properties: Record<number, Property>;
  turn: number;
  turnNumber?: number;
  phase: "roll" | "buy" | "end";
  doubles: number;
  extra: boolean;
  dice: [number, number];
  debt: Debt | null;
  debts?: Debt[];
  auction?: Auction | null;
  auctionQueue?: number[];
  choice?: { player: string; kind: "collect"; amount: number } | null;
  opening?: { candidates: string[]; rolls: Record<string, number>; round: number } | null;
  trades: Trade[];
  decks: { email: number[]; sms: number[] };
  log: string[];
  duration: number;
  endsAt: number | null;
  turnAt: number;
  winner: string[];
  motion: { serial: number; player: string; path: number[] } | null;
  lastCard: string | null;
  events?: GameEvent[];
  eventSerial?: number;
  eliminated?: string[];
}
export type Action = (
  | {
      type:
        | "start"
        | "roll"
        | "buy"
        | "decline"
        | "end"
        | "settle"
        | "bankrupt"
        | "pass"
        | "wait"
        | "bail"
        | "salary"
        | "opening-roll"
        | "fold"
        | "auction-expire";
    }
  | {
      type: "build" | "sell" | "sell-group" | "mortgage" | "redeem" | "return";
      square: number;
    }
  | { type: "color"; color: string }
  | {
      type: "trade";
      to: string;
      give: number[];
      take: number[];
      giveMoney: number;
      takeMoney: number;
    }
  | { type: "accept" | "reject"; trade: string }
  | { type: "skip" | "expel" }
  | { type: "change"; denomination: number }
  | { type: "bid"; amount: number; square?: number }
  | { type: "collect"; target: string }
  | { type: "acquire"; square: number }
) & { bills?: Record<string, number> };
export interface Context {
  now: number;
  dice: [number, number];
  shuffled: { email: number[]; sms: number[] };
  inactive?: boolean;
}
export const COLORS = [
  "#d84b38",
  "#2779bd",
  "#dfa51b",
  "#8a56aa",
  "#218a65",
  "#d3508c",
];

export interface Debt {
  amount: number;
  creditor: string | null;
  payer?: string;
  reason?: "bail" | "purchase" | "inheritance";
  square?: number;
}
export interface Auction {
  buildingOptions?: Record<string, number[]>;
  square: number;
  amount: number;
  bidder: string | null;
  passed: string[];
  endsAt: number;
}
````

## lib/http.ts

````typescript
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpError } from "./store";
export async function body(req: Request): Promise<unknown> {
  const text = await req.text();
  if (text.length > 16000)
    throw new HttpError(413, "Solicitud demasiado grande.");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON inválido.");
  }
}
export async function respond(fn: () => Promise<unknown>) {
  try {
    return NextResponse.json(await fn(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    const status =
      e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500;
    const message =
      e instanceof HttpError
        ? e.message
        : e instanceof ZodError
          ? "Revisa los datos enviados."
          : "No pudimos conectar con Redis. Intenta nuevamente.";
    if (status === 500)
      console.error(
        "Redis request failed",
        e instanceof Error ? e.name : "unknown",
      );
    return NextResponse.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}
````

## lib/site.ts

````typescript
const configuredUrl = new URL(
  process.env.SITE_URL || "https://rumbo-mundial-khaki.vercel.app",
);
if (!['https:', 'http:'].includes(configuredUrl.protocol)) {
  throw new Error("SITE_URL debe ser una URL pública con https:// o http://.");
}

export const siteUrl = new URL(configuredUrl.origin);
export const indexable =
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development" &&
  process.env.NODE_ENV !== "development";
export const siteTitle = "Turista mundial online con amigos | Rumbo Mundial";
export const siteDescription =
  "Juega turista mundial online con amigos en Rumbo Mundial: de 2 a 6 jugadores, países, casas, hoteles y tratos. Crea una sala y comparte el enlace, sin descargar nada.";
````

## lib/store.ts

````typescript
import { Redis } from "@upstash/redis";
import { createHash, randomInt, randomUUID } from "node:crypto";
import { z } from "zod";
import { RULES_VERSION } from "./game/board";
import { CARDS } from "./game/cards";
import { shuffleDeck } from "./game/shuffle";
import {
  addLog,
  engine,
  finishByTime,
  newGame,
  newPlayer,
  waitingPlayer,
} from "./game/engine";
import { COLORS, type Action, type Context, type Game } from "./game/types";
interface Stored {
  game: Game;
  tokens: Record<string, string>;
  receipts: Record<string, number>;
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token)
    throw new HttpError(
      503,
      "Configura las variables de Upstash Redis para jugar.",
    );
  return new Redis({ url, token });
}
const key = (id: string) => `turista:room:${id}`;
const digest = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export const roomId = z
  .string()
  .regex(/^[A-HJ-NP-Z2-9]{6}$/, "ID de sala inválido.");
export const identity = z.object({
  name: z.string().trim().min(1).max(24),
  color: z.enum(COLORS as [string, ...string[]]).optional(),
});
const square = z.number().int().min(0).max(39);
const baseActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.enum([
      "start",
      "roll",
      "buy",
      "decline",
      "end",
      "settle",
      "bankrupt",
      "pass",
      "wait",
      "bail",
      "skip",
      "expel",
      "salary",
      "opening-roll",
      "fold",
      "auction-expire",
    ]),
  }),
  z.object({
    type: z.enum(["build", "sell", "sell-group", "mortgage", "redeem", "return"]),
    square,
  }),
  z.object({
    type: z.literal("color"),
    color: z.enum(COLORS as [string, ...string[]]),
  }),
  z.object({
    type: z.literal("trade"),
    to: z.string().uuid(),
    give: z.array(square).max(30),
    take: z.array(square).max(30),
    giveMoney: z.number().int().nonnegative().max(100000000),
    takeMoney: z.number().int().nonnegative().max(100000000),
  }),
  z.object({ type: z.literal("bid"), amount: z.number().int().positive().max(100000000), square: square.optional() }),
  z.object({ type: z.literal("collect"), target: z.string().uuid() }),
  z.object({ type: z.literal("acquire"), square }),
  z.object({ type: z.literal("accept"), trade: z.string().max(100) }),
  z.object({ type: z.literal("reject"), trade: z.string().max(100) }),
  z.object({
    type: z.literal("change"),
    denomination: z.number().int().positive(),
  }),
]);
export const actionSchema: z.ZodType<Action> = baseActionSchema.and(
  z.object({
    bills: z.record(z.number().int().nonnegative().max(100000000)).optional(),
  }),
);
const CAS = `local old=redis.call('GET',KEYS[1]); if not old then return -1 end; local parsed=cjson.decode(old); if parsed.game.version~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',86400); return 1`;
async function save(id: string, old: number, value: Stored) {
  const result = await redis().eval(
    CAS,
    [key(id)],
    [old, JSON.stringify(value)],
  );
  if (result === -1) throw new HttpError(404, "Sala no encontrada.");
  if (result !== 1)
    throw new HttpError(
      409,
      "La sala cambió. Actualiza el estado antes de intentar otra vez.",
    );
}
async function read(id: string): Promise<Stored> {
  roomId.parse(id);
  const stored = await redis().get<Stored>(key(id));
  if (!stored) throw new HttpError(404, "Sala no encontrada.");
  if (stored.game.rulesVersion !== RULES_VERSION) throw new HttpError(410, "Esta sala usa el tablero anterior. Crea una sala nueva para jugar Rumbo Mundial.");
  return stored;
}
function authorize(stored: Stored, token: string) {
  const id = stored.tokens[digest(token)];
  if (!id) throw new HttpError(401, "El token no pertenece a esta sala.");
  return id;
}
export function publicGame(s: Game): Game {
  return { ...s, decks: { email: [], sms: [] } };
}
function context(): Context {
  return {
    now: Date.now(),
    dice: [randomInt(1, 7), randomInt(1, 7)],
    shuffled: {
      email: shuffleDeck(CARDS.email.length, randomInt),
      sms: shuffleDeck(CARDS.sms.length, randomInt),
    },
  };
}
export async function createRoom(input: unknown) {
  const data = identity
    .extend({
      duration: z
        .union([z.literal(0), z.literal(30), z.literal(60), z.literal(90)])
        .default(0),
    })
    .parse(input);
  const token = randomUUID(),
    player = newPlayer(randomUUID(), data.name, data.color ?? COLORS[0]);
  for (let attempt = 0; attempt < 8; attempt++) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const id = Array.from(
      { length: 6 },
      () => alphabet[randomInt(alphabet.length)],
    ).join("");
    const game = newGame(id, player, data.duration);
    const stored: Stored = {
      game,
      tokens: { [digest(token)]: player.id },
      receipts: {},
    };
    if (await redis().set(key(id), stored, { nx: true, ex: 86400 }))
      return {
        id,
        playerToken: token,
        playerId: player.id,
        game: publicGame(game),
      };
  }
  throw new HttpError(503, "No se pudo crear una sala. Intenta otra vez.");
}
export async function joinRoom(id: string, input: unknown) {
  const data = identity
    .extend({ token: z.string().uuid().optional() })
    .parse(input);
  const token = randomUUID();
  for (let i = 0; i < 4; i++) {
    const stored = await read(id);
    if (data.token) {
      const existing = stored.tokens[digest(data.token)];
      if (!existing)
        throw new HttpError(401, "El token no pertenece a esta sala.");
      return {
        playerToken: data.token,
        playerId: existing,
        game: publicGame(stored.game),
      };
    }
    const s = stored.game;
    if (s.status !== "lobby")
      throw new HttpError(409, "La partida ya comenzó.");
    if (s.players.length >= 6) throw new HttpError(409, "La sala está llena.");
    const color =
      data.color ?? COLORS.find((c) => !s.players.some((p) => p.color === c));
    if (!color || s.players.some((p) => p.color === color))
      throw new HttpError(409, "Este color ya está ocupado.");
    const p = newPlayer(randomUUID(), data.name, color);
    s.players.push(p);
    stored.tokens[digest(token)] = p.id;
    const old = s.version;
    s.version++;
    addLog(s, `${p.name} se unió al viaje.`);
    try {
      await save(id, old, stored);
      return { playerToken: token, playerId: p.id, game: publicGame(s) };
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409 || i === 3) throw e;
    }
  }
  throw new HttpError(409, "Intenta unirte nuevamente.");
}
export async function getRoom(
  id: string,
  token: string | null,
  heartbeat: boolean,
) {
  let stored = await read(id);
  let playerId: string | null = null;
  if (token) {
    playerId = authorize(stored, token);
    if (heartbeat)
      await redis().set(`turista:seen:${id}:${playerId}`, Date.now(), {
        ex: 86400,
      });
  }
  const expired = finishByTime(stored.game, Date.now());
  if (expired !== stored.game) {
    const old = stored.game.version;
    expired.version = old + 1;
    stored.game = expired;
    try {
      await save(id, old, stored);
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409) throw e;
      stored = await read(id);
    }
  }
  const active = stored.game.players.find((p) => p.id === waitingPlayer(stored.game))!;
  const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
  return {
    game: publicGame(stored.game),
    playerId,
    inactiveFor: Math.max(
      0,
      Date.now() - Math.max(stored.game.turnAt, seen ?? 0),
    ),
  };
}
export async function act(id: string, input: unknown) {
  const data = z
    .object({
      token: z.string().uuid(),
      action: actionSchema,
      version: z.number().int().positive(),
      requestId: z.string().uuid(),
    })
    .parse(input);
  const stored = await read(id),
    pid = authorize(stored, data.token);
  const receipt = `${pid}:${data.requestId}`;
  if (stored.receipts[receipt]) return { game: publicGame(stored.game) };
  if (stored.game.version !== data.version)
    throw new HttpError(409, "La sala cambió. Revisa el estado actualizado.");
  const ctx = context();
  if (data.action.type === "skip" || data.action.type === "expel") {
    const active = stored.game.players.find((p) => p.id === waitingPlayer(stored.game))!;
    const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
    ctx.inactive = ctx.now - Math.max(stored.game.turnAt, seen ?? 0) >= 90000;
  }
  let next: Game;
  try {
    next = engine(stored.game, data.action, pid, ctx);
  } catch (e) {
    throw new HttpError(
      400,
      e instanceof Error ? e.message : "Acción inválida.",
    );
  }
  next.version = stored.game.version + 1;
  const old = stored.game.version;
  stored.game = next;
  stored.receipts[receipt] = next.version;
  stored.receipts = Object.fromEntries(
    Object.entries(stored.receipts).slice(-100),
  );
  await save(id, old, stored);
  await redis().set(`turista:seen:${id}:${pid}`, ctx.now, { ex: 86400 });
  return { game: publicGame(next) };
}
````

## tests/api-smoke.mjs

````javascript
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
async function post(path, payload) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { status: response.status, data: await response.json() };
}
const created = await post("/api/rooms", { name: "Prueba Ana", duration: 30 });
assert.equal(created.status, 200, JSON.stringify(created.data));
const a = created.data,
  id = a.id;
const joined = await post(`/api/rooms/${id}/join`, { name: "Prueba Luis" });
assert.equal(joined.status, 200, JSON.stringify(joined.data));
const b = joined.data;
const action = (token, version, action, requestId = randomUUID()) =>
  post(`/api/rooms/${id}/action`, { token, version, action, requestId });
const wrong = await action(randomUUID(), b.game.version, { type: "start" });
assert.equal(wrong.status, 401);
const requestId = randomUUID();
const start = await action(
  a.playerToken,
  b.game.version,
  { type: "start" },
  requestId,
);
assert.equal(start.status, 200, JSON.stringify(start.data));
const replay = await action(
  a.playerToken,
  b.game.version,
  { type: "start" },
  requestId,
);
assert.equal(replay.data.game.version, start.data.game.version);
const pair = await Promise.all([
  action(a.playerToken, start.data.game.version, { type: "opening-roll" }),
  action(a.playerToken, start.data.game.version, { type: "opening-roll" }),
]);
assert.deepEqual(pair.map((x) => x.status).sort(), [200, 409]);
const snapshot = await fetch(`${base}/api/rooms/${id}`, {
  headers: { Authorization: `Bearer ${a.playerToken}` },
}).then((r) => r.json());
assert.equal(snapshot.playerId, a.playerId);
assert.equal(snapshot.game.players.length, 2);
assert.equal(JSON.stringify(snapshot).includes(a.playerToken), false);
assert.deepEqual(snapshot.game.decks, { email: [], sms: [] });
const unchanged = await fetch(
  `${base}/api/rooms/${id}?since=${snapshot.game.version}`,
).then((r) => r.json());
assert.equal(unchanged.changed, false);
console.log(
  `API y concurrencia verificadas en sala ${id}. La sala de prueba expira en 24 horas.`,
);
````

## tests/engine.test.ts

````typescript
import { describe, expect, it } from "vitest";
import { engine, finishByTime } from "../lib/game/engine";
import { BOARD, INITIAL_MONEY, SALARY } from "../lib/game/board";
import { CARDS } from "../lib/game/cards";
import { assetError, bankStock, rent, redemptionCost } from "../lib/game/rules";
import { totalBills, wallet } from "../lib/game/money";
import { game, go, ctx } from "./helpers";

describe("Tablero de referencia y reglas", () => {
  it("conserva 40 posiciones, 24 países y dos mazos originales de 16 cartas", () => {
    expect(BOARD).toHaveLength(40);
    expect(BOARD.filter((b)=>b.kind==="country")).toHaveLength(24);
    expect(BOARD.map((b)=>b.id)).toEqual(Array.from({length:40},(_,i)=>i));
    expect(BOARD.filter((b)=>b.kind==="country").map((b)=>b.name)).toEqual(["Marruecos","Egipto","Sudáfrica","Rusia","China","Japón","Canadá","Estados Unidos","México","Guatemala","Costa Rica","Panamá","Colombia","Venezuela","Perú","Brasil","Chile","Argentina","España","Francia","Inglaterra","Italia","Suiza","Alemania"]);
    expect(CARDS.email).toHaveLength(16);expect(CARDS.sms).toHaveLength(16);
    expect(BOARD[29].rents[2]).toBe(27500);
    expect(BOARD.filter((b)=>b.price).every((b)=>b.mortgage===b.price/2)).toBe(true);
  });
  it("entrega $134,500 y la distribución de billetes de referencia", () => {
    const p=game().players[0];expect(p.money).toBe(INITIAL_MONEY);
    expect(totalBills(wallet(p))).toBe(134500);expect(p.bills).toEqual({50000:2,10000:2,5000:2,2000:1,1000:2,500:1});
  });
  it("cobra salida solo al reclamar, una vez y sin mutar el estado original", () => {
    const s=game();s.players[0].position=38;
    let next=go(s,{type:"roll"},[1,2]);expect(next.players[0].position).toBe(1);
    expect(next.players[0].money).toBe(INITIAL_MONEY);expect(next.players[0].salary).toBe(SALARY);
    next=go(next,{type:"salary"});expect(next.players[0].money).toBe(INITIAL_MONEY+SALARY);
    expect(()=>go(next,{type:"salary"})).toThrow();expect(s.players[0].position).toBe(38);
    expect(go(s,{type:"roll"},[1,1]).players[0].salary).toBe(SALARY);
  });
  it("pierde el sueldo no reclamado al ceder el turno",()=>{
    let s=game();s.players[0].salary=20000;s.phase="end";
    s=go(s,{type:"end"});expect(s.players[0].salary).toBe(0);
    expect(()=>go(s,{type:"salary"})).toThrow();
  });
  it("dobla renta de bloque y no cobra hipotecas ni desde cárcel",()=>{
    const s=game();for(const id of [1,2,4])s.properties[id].owner="a";
    expect(rent(s,1,7)).toBe(3000);s.properties[2].mortgaged=true;
    expect(rent(s,1,7)).toBe(3000);s.properties[1].mortgaged=true;
    expect(rent(s,1,7)).toBe(0);s.properties[1].mortgaged=false;
    s.players[0].jailed=3;s.players[0].detention="prison";expect(rent(s,1,7)).toBe(0);
  });
  it("construye de forma pareja hasta hotel incluso fuera de turno",()=>{
    let s=game();s.players[1].money=500000;for(const id of [16,17,19])s.properties[id].owner="b";
    s=go(s,{type:"build",square:16},[1,2],"b");
    expect(()=>go(s,{type:"build",square:16},[1,2],"b")).toThrow(/menos edificios/);
    for(const id of [17,19])s=go(s,{type:"build",square:id},[1,2],"b");
    for(let level=2;level<=5;level++)for(const id of [16,17,19])s=go(s,{type:"build",square:id},[1,2],"b");
    expect(s.properties[16].buildings).toBe(5);expect(s.players[1].money).toBe(425000);
    expect(bankStock(s)).toEqual({houses:36,hotels:9});
    s=go(s,{type:"sell",square:16},[1,2],"b");expect(s.players[1].money).toBe(427500);
    expect(()=>go(s,{type:"sell",square:16},[1,2],"b")).toThrow(/más edificios/);
  });
  it("exige bloque completo sin hipotecas y suficientes piezas",()=>{
    const s=game();s.properties[1].owner="a";
    expect(assetError(s,s.players[0],1,"build")).toMatch(/grupo/);
    for(const id of [2,4])s.properties[id].owner="a";s.properties[2].mortgaged=true;
    expect(()=>go(s,{type:"build",square:1})).toThrow(/hipotecas/);
    s.properties[2].mortgaged=false;
    for(const b of BOARD.filter((b)=>b.kind==="country"&&b.group!=="África").slice(0,9))s.properties[b.id].buildings=4;
    expect(()=>go(s,{type:"build",square:1})).toThrow(/casas disponibles/);
  });
  it("hipoteca fuera de turno y redime con diez por ciento",()=>{
    let s=game();s.properties[1].owner="b";
    s=go(s,{type:"mortgage",square:1},[1,2],"b");expect(s.players[1].money).toBe(140500);
    s=go(s,{type:"redeem",square:1},[1,2],"b");expect(s.players[1].money).toBe(133900);
    expect(s.properties[1].mortgaged).toBe(false);
  });
  it("no duplica dinero al devolver una propiedad hipotecada",()=>{
    let s=game();s.properties[1].owner="a";
    s=go(s,{type:"mortgage",square:1});s=go(s,{type:"return",square:1});
    expect(s.players[0].money).toBe(140500);expect(s.properties[1].owner).toBeNull();
    expect(()=>go(s,{type:"return",square:1})).toThrow();
  });
  it("Australia y visita a Deportado no penalizan",()=>{
    for(const [from,to] of [[17,20],[7,10]]){const s=game();s.players[0].position=from;
      const next=go(s,{type:"roll"});expect(next.players[0].position).toBe(to);expect(next.players[0].jailed).toBe(0);}
  });
  it("Cárcel cobra fianza y pierde exactamente tres turnos; dobles no liberan",()=>{
    let s=game();s.players[0].position=27;s=go(s,{type:"roll"});
    expect(s.players[0].jailed).toBe(3);expect(s.debt?.amount).toBe(10000);
    s=go(s,{type:"settle"});expect(s.players[0].money).toBe(124500);
    for(let remaining=2;remaining>=0;remaining--){s.phase="roll";s=go(s,{type:"roll"},[2,2]);
      expect(s.players[0].position).toBe(30);expect(s.players[0].jailed).toBe(remaining);expect(s.phase).toBe("end");}
    s.phase="roll";s=go(s,{type:"roll"},[1,3]);expect(s.players[0].position).toBe(34);
  });
  it("tercer doble deporta; la multa devuelve a Salida sin sueldo",()=>{
    let s=game();s.doubles=2;s.players[0].position=39;
    s=go(s,{type:"roll"},[2,2]);expect(s.players[0].position).toBe(10);expect(s.players[0].jailed).toBe(3);
    expect(s.players[0].money).toBe(INITIAL_MONEY);expect(s.extra).toBe(false);
    s=go(s,{type:"bail"});expect(s.players[0].position).toBe(0);expect(s.players[0].money).toBe(129500);expect(s.players[0].salary).toBe(0);
  });
  it("deportación admite esperar tres turnos y no salir al segundo",()=>{
    let s=game();s.doubles=2;s=go(s,{type:"roll"},[2,2]);
    for(let remaining=2;remaining>=0;remaining--){s.phase="roll";s=go(s,{type:"wait"});expect(s.players[0].jailed).toBe(remaining);
      expect(s.players[0].position).toBe(remaining ? 10 : 0);expect(s.phase).toBe("end");}
  });
  it("renta de aerolíneas y diplomacia usa factores de referencia",()=>{
    const s=game();s.properties[5].owner="b";s.properties[15].owner="b";expect(rent(s,5,7)).toBe(5000);
    s.properties[3].owner="b";expect(rent(s,3,7)).toBe(3500);s.properties[22].owner="b";expect(rent(s,3,7)).toBe(7000);
  });
  it("deuda exige pago y admite hipoteca para reunir el importe",()=>{
    let s=game();s.players[0].money=100;s.properties[3].owner="b";s.properties[1].owner="a";
    s=go(s,{type:"roll"});expect(s.debt?.amount).toBe(1500);expect(()=>go(s,{type:"end"})).toThrow(/deuda/);
    s=go(s,{type:"mortgage",square:1});s=go(s,{type:"settle"});expect(s.players[0].money).toBe(4600);expect(s.players[1].money).toBe(136000);
  });
  it("quiebra transfiere hipotecas, cobra intereses al heredero y después declara ganador",()=>{
    let s=game();s.players[0].money=0;s.properties[1].owner="a";s.properties[1].mortgaged=true;
    s.debt={amount:200000,creditor:"b",payer:"a"};s=go(s,{type:"bankrupt"});
    expect(s.properties[1].owner).toBe("b");expect(s.debt).toMatchObject({payer:"b",amount:1200});expect(s.status).toBe("playing");
    expect(redemptionCost(s,1)).toBe(6000);
    s=go(s,{type:"settle"},[1,2],"b");expect(s.players[1].money).toBe(133300);expect(s.winner).toEqual(["b"]);
  });
  it("quiebra al Banco subasta bienes cuando quedan otros dos jugadores",()=>{
    let s=game(3);s.players[0].money=0;s.properties[1].owner="a";s.debt={amount:100000,creditor:null,payer:"a"};
    s=go(s,{type:"bankrupt"});expect(s.properties[1].owner).toBeNull();expect(s.auction?.square).toBe(1);
    s=go(s,{type:"bid",amount:500},[1,2],"b");s=go(s,{type:"fold"},[1,2],"c");expect(s.properties[1].owner).toBe("b");expect(s.auction).toBeNull();
  });
  it("no permite quiebra mientras los bienes cubran la deuda",()=>{
    const s=game();s.debt={amount:100,creditor:null,payer:"a"};expect(()=>go(s,{type:"bankrupt"})).toThrow(/cubrir/);
  });
  it("rechazar compra abre subasta; el mismo jugador puede ganarla",()=>{
    let s=game();s=go(s,{type:"roll"});s=go(s,{type:"decline"});expect(s.auction?.square).toBe(3);
    s=go(s,{type:"bid",amount:500});s=go(s,{type:"fold"},[1,2],"b");
    expect(s.properties[3].owner).toBe("a");expect(s.players[0].money).toBe(134000);expect(()=>go(s,{type:"buy"})).toThrow();
  });
  it("subasta vence durante polling sin temporizador residente",()=>{
    let s=game();s=go(go(s,{type:"roll"}),{type:"decline"});s=go(s,{type:"bid",amount:1000});
    expect(finishByTime(s,20999)).toBe(s);s=finishByTime(s,21000);expect(s.auction).toBeNull();expect(s.properties[3].owner).toBe("a");
  });
  it("tratos fuera de turno revalidan propiedad y saldo",()=>{
    let s=game();s.properties[1].owner="b";
    s=go(s,{type:"trade",to:"a",give:[1],take:[],giveMoney:0,takeMoney:10000},[1,2],"b");
    const id=s.trades[0].id;s=go(s,{type:"accept",trade:id});expect(s.properties[1].owner).toBe("a");
    expect(s.players[0].money).toBe(124500);expect(s.players[1].money).toBe(144500);expect(()=>go(s,{type:"accept",trade:id})).toThrow();
  });
  it("prisión impide administrar propiedades pero permite liquidar para pagar fianza",()=>{
    const s=game();s.players[0].jailed=3;s.players[0].detention="prison";s.properties[1].owner="a";
    expect(()=>go(s,{type:"mortgage",square:1})).toThrow(/cárcel/);s.debt={payer:"a",creditor:null,amount:10000,reason:"bail"};
    expect(go(s,{type:"mortgage",square:1}).properties[1].mortgaged).toBe(true);
  });
  it("pase diplomático cancela la fianza pendiente y regresa al mazo",()=>{
    let s=game();s.players[0].position=5;s.decks.sms=[0,...s.decks.sms.filter((i)=>i!==0)];
    s=go(s,{type:"roll"});expect(s.players[0].passes).toEqual(["sms"]);expect(s.decks.sms).not.toContain(0);
    s.phase="roll";s.players[0].position=27;s=go(s,{type:"roll"});s=go(s,{type:"pass"});
    expect(s.debt).toBeNull();expect(s.players[0].jailed).toBe(0);expect(s.decks.sms.at(-1)).toBe(0);expect(s.players[0].money).toBe(INITIAL_MONEY);
  });
  it("termina por tiempo con empate y patrimonio neto",()=>{
    const s=game();s.endsAt=2000;expect(finishByTime(s,1999)).toBe(s);expect(finishByTime(s,2000).winner).toEqual(["a","b"]);
    s.properties[1].owner="a";expect(finishByTime(s,2000).winner).toEqual(["a"]);
  });
  it("moderación exige host e inactividad comprobada",()=>{
    const s=game();expect(()=>go(s,{type:"skip"})).toThrow(/90/);
    expect(engine(s,{type:"skip"},"a",{...ctx,inactive:true}).turn).toBe(1);
  });
});
````

## tests/helpers.ts

````typescript
import { engine, newGame, newPlayer } from "../lib/game/engine";
import { CARDS } from "../lib/game/cards";
import type { Action, Context, Game } from "../lib/game/types";
export const ctx: Context = {now:1000,dice:[1,2],shuffled:{email:CARDS.email.map((_,i)=>i),sms:CARDS.sms.map((_,i)=>i)}};
export const go = (s:Game,a:Action,dice:[number,number]=[1,2],who="a")=>engine(s,a,who,{...ctx,dice});
export function game(count=2) {
  const s = newGame("ABC234",newPlayer("a","Ana","#a00"),0);
  for (let i=1;i<count;i++) s.players.push(newPlayer(String.fromCharCode(97+i),["Ana","Luis","Sol","Luz"][i],`#00${i}`));
  let started=go(s,{type:"start"});
  for (let i=0;i<count;i++) started=go(started,{type:"opening-roll"},[6-i,1],String.fromCharCode(97+i));
  return started;
}
````

## tests/regressions.test.ts

````typescript
import { expect, it } from "vitest";
import { game, go, ctx } from "./helpers";
import { engine, newGame, newPlayer, finishByTime } from "../lib/game/engine";
import { BOARD } from "../lib/game/board";
import { assetError, ranking } from "../lib/game/rules";
import { exchange, pay, totalBills, wallet } from "../lib/game/money";
import { shuffleDeck } from "../lib/game/shuffle";
import type { Action } from "../lib/game/types";

it("una tirada de 12 avanza doce pasos, no cuarenta",()=>{
  const s=go(game(),{type:"roll"},[6,6]);expect(s.motion?.path).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
});
it("separación de movimiento por dado y carta evita vueltas fantasma",()=>{
  let s=game();s.players[0].position=10;s.decks.email=[13,...s.decks.email.filter((i)=>i!==13)];
  s=go(s,{type:"roll"});const moves=s.events?.filter((e)=>e.type==="move");
  expect(moves?.map((e)=>e.path?.length)).toEqual([3,26]);expect(s.players[0].position).toBe(39);
});
it("cada tirada incluso idéntica tiene un evento distinto compartido",()=>{
  let s=game();s=go(s,{type:"roll"});s=go(s,{type:"buy"});s=go(s,{type:"end"});s=go(s,{type:"roll"},[1,2],"b");
  const rolls=s.events?.filter((e)=>e.type==="roll" && e.dice?.[1]!==0)??[];
  expect(rolls).toHaveLength(2);expect(rolls[0].id).not.toBe(rolls[1].id);expect(rolls[1].player).toBe("b");
});
it("compras producen aviso público y pago con billetes valida pertenencia",()=>{
  let s=go(game(),{type:"roll"});expect(()=>go(s,{type:"buy",bills:{10000:50}})).toThrow(/billetes/);
  s=go(s,{type:"buy",bills:{10000:2}});expect(s.players[0].money).toBe(114500);expect(s.events?.at(-1)?.type).toBe("purchase");
});
it("billetes y cambio conservan valor, incluso importes pequeños",()=>{
  const p=game().players[0];exchange(p,50000);expect(totalBills(wallet(p))).toBe(134500);
  pay(p,6600,{10000:1});expect(totalBills(wallet(p))).toBe(127900);expect(wallet(p)[100]).toBeGreaterThan(0);
  expect(()=>pay(p,100,{500:999})).toThrow();expect(()=>pay(p,100,{"100.0":1})).toThrow();
});
it("barajado Fisher–Yates utiliza entropía inyectada y conserva todas las cartas",()=>{
  const a=shuffleDeck(16,()=>0),b=shuffleDeck(16,(max)=>max-1);expect(a).not.toEqual(b);
  expect([...a].sort((x,y)=>x-y)).toEqual(Array.from({length:16},(_,i)=>i));
});
it("selección inicial resuelve empate sin favorecer al anfitrión",()=>{
  let s=newGame("ABC234",newPlayer("a","Ana","red"),0);s.players.push(newPlayer("b","Luis","blue"));
  s=go(s,{type:"start"});s=go(s,{type:"opening-roll"},[4,1]);s=go(s,{type:"opening-roll"},[4,2],"b");expect(s.opening?.round).toBe(2);
  s=go(s,{type:"opening-roll"},[1,1]);s=go(s,{type:"opening-roll"},[5,2],"b");expect(s.turn).toBe(1);expect(s.opening).toBeNull();
});
it("pago colectivo se procesa por jugador y no pierde deudas",()=>{
  let s=game(3);s.players[0].position=10;s.decks.email=[11];s=go(s,{type:"roll"});
  expect(s.debt?.payer).toBe("a");expect(s.debts).toHaveLength(2);
  for(const id of ["a","b","c"])s=go(s,{type:"settle"},[1,2],id);
  expect(s.players.map((p)=>p.money)).toEqual([129500,129500,129500]);expect(s.debt).toBeNull();
});
it("carta de adquisición solo permite completar un bloque y no se reutiliza",()=>{
  let s=game();s.players[0].acquisitionCard=true;s.properties[1].owner="a";
  expect(()=>go(s,{type:"acquire",square:2})).toThrow(/último país/);
  s.properties[4].owner="a";s.properties[2].owner="b";s=go(s,{type:"acquire",square:2});
  expect(s.properties[2].owner).toBe("a");expect(s.players[0].money).toBe(132500);expect(s.players[1].money).toBe(136500);
  expect(()=>go(s,{type:"acquire",square:2})).toThrow();
});
it("ranking coloca supervivientes por patrimonio y quebrados en orden inverso de eliminación",()=>{
  const s=game(4);s.players[0].money=100;s.players[1].money=200;s.players[2].bankrupt=true;s.players[3].bankrupt=true;s.eliminated=["c","d"];
  expect(ranking(s).map((x)=>x.player.id)).toEqual(["b","a","d","c"]);
});
it.each([1234567,8459,9234])("completa una partida con cartas, subastas, pagos y quiebras, semilla %i",(initialSeed)=>{
  let s=game(3),seed=initialSeed;
  const die=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return (seed%6)+1;};
  for(let step=0;step<30000&&s.status==="playing";step++){
    const now=1000+step*100;
    if(s.auction){s=finishByTime(s,s.auction.endsAt);continue;}
    let p=s.players[s.turn];let action:Action;
    if(s.debt){p=s.players.find((x)=>x.id===(s.debt?.payer??p.id))!;
      if(p.money>=s.debt.amount)action={type:"settle"};else{
        const own=BOARD.filter((b)=>s.properties[b.id]?.owner===p.id);
        const sell=own.find((b)=>!assetError(s,p,b.id,"sell"));const mortgage=own.find((b)=>!assetError(s,p,b.id,"mortgage"));
        action=sell?{type:"sell",square:sell.id}:mortgage?{type:"mortgage",square:mortgage.id}:{type:"bankrupt"};
      }
    }else if(s.choice){p=s.players.find((x)=>x.id===s.choice?.player)!;action={type:"collect",target:s.players.find((x)=>x.id!==p.id&&!x.bankrupt)!.id};}
    else if(p.salary)action={type:"salary"};
    else if(s.phase==="roll")action={type:p.jailed||p.skipTurns?"wait":"roll"};
    else if(s.phase==="buy")action={type:p.money>=BOARD[p.position].price?"buy":"decline"};
    else{const build=BOARD.find((b)=>s.properties[b.id]?.owner===p.id&&p.money>50000&&!assetError(s,p,b.id,"build"));action=build?{type:"build",square:build.id}:{type:"end"};}
    s=engine(s,action,p.id,{...ctx,now,dice:[die(),die()]});
    expect(s.players.every((p)=>p.money>=0)).toBe(true);
  }
  expect(s.status).toBe("finished");expect(s.winner).toHaveLength(1);
});

it("la última casa se subasta entre quienes pueden construir, sin duplicar la pieza",()=>{
  let s=game(3);
  for(const id of [1,2,4])s.properties[id].owner="a";
  for(const id of [16,17,19])s.properties[id].owner="b";
  for(const id of [6,7,9,11,12,14,21,23,24])s.properties[id]={owner:"c",buildings:id===24?3:4,mortgaged:false};
  s=go(s,{type:"build",square:1});expect(s.auction?.buildingOptions?.b).toContain(16);
  s=go(s,{type:"bid",amount:5000,square:16},[1,2],"b");
  s=go(s,{type:"fold"});s=go(s,{type:"fold"},[1,2],"c");
  expect(s.properties[16].buildings).toBe(1);expect(s.properties[1].buildings).toBe(0);
  expect(s.players[1].money).toBe(129500);expect(s.auction).toBeNull();
});
it("vender edificios del bloque permite liquidar hoteles cuando faltan casas",()=>{
  let s=game();for(const id of [1,2,4])s.properties[id]={owner:"a",buildings:5,mortgaged:false};
  for(const b of BOARD.filter((b)=>b.kind==="country"&&b.group!=="África").slice(0,9))s.properties[b.id].buildings=4;
  expect(()=>go(s,{type:"sell",square:1})).toThrow(/cuatro casas/);
  s=go(s,{type:"sell-group",square:1});expect([1,2,4].every((id)=>s.properties[id].buildings===0)).toBe(true);
  expect(s.players[0].money).toBe(197000);
});
it("el host puede saltar a quien no responde durante la elección de salida",()=>{
  let s=newGame("ABC234",newPlayer("a","Ana","red"),0);s.players.push(newPlayer("b","Luis","blue"));s=go(s,{type:"start"});
  s=engine(s,{type:"skip"},"a",{...ctx,inactive:true});expect(s.opening?.rolls.a).toBe(0);
  s=go(s,{type:"opening-roll"},[2,2],"b");expect(s.turn).toBe(1);
});
it("el permiso de adquisición y la carta de bono no permiten cobrar desde la cárcel",()=>{
  const s=game();s.players[0].jailed=3;s.players[0].detention="prison";s.players[0].acquisitionCard=true;
  for(const id of [1,4])s.properties[id].owner="a";
  expect(()=>go(s,{type:"acquire",square:2})).toThrow();
});
````

## tests/store.test.ts

````typescript
import { beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
// Test double only: production state is exclusively in Redis.
const memory = vi.hoisted(() => new Map<string, string>());
vi.mock("@upstash/redis", () => ({
  Redis: class {
    async get(key: string) {
      const raw = memory.get(key);
      return raw ? JSON.parse(raw) : null;
    }
    async set(key: string, value: unknown, options?: { nx?: boolean }) {
      if (options?.nx && memory.has(key)) return null;
      memory.set(key, JSON.stringify(value));
      return "OK";
    }
    async eval(_script: string, keys: string[], args: unknown[]) {
      const raw = memory.get(keys[0]);
      if (!raw) return -1;
      const stored = JSON.parse(raw);
      if (stored.game.version !== args[0]) return 0;
      memory.set(keys[0], String(args[1]));
      return 1;
    }
  },
}));
import { act, createRoom, getRoom, joinRoom } from "../lib/store";
import type { Action } from "../lib/game/types";
async function setup() {
  const a = await createRoom({ name: "Ana" });
  const b = await joinRoom(a.id, { name: "Luis" });
  return { a, b };
}
const request = (
  token: string,
  version: number,
  action: Action,
  requestId = randomUUID(),
) => ({ token, version, action, requestId });
beforeEach(() => {
  memory.clear();
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.test");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
});
describe("Persistencia autoritativa (adaptador Redis simulado)", () => {
  it("emite tokens únicos, recupera identidad y no filtra secretos ni mazos", async () => {
    const { a, b } = await setup();
    expect(a.playerToken).not.toBe(b.playerToken);
    const view = await getRoom(a.id, a.playerToken, true);
    expect(view.playerId).toBe(a.playerId);
    expect(JSON.stringify(view)).not.toContain(a.playerToken);
    const started = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    expect(started.game.decks).toEqual({ email: [], sms: [] });
    const stored = JSON.parse(memory.get(`turista:room:${a.id}`)!);
    expect(stored.game.decks.email).toHaveLength(16);
    expect(JSON.stringify(stored)).not.toContain(a.playerToken);
  });
  it("rechaza token falsificado y no confía en un playerId", async () => {
    const { a, b } = await setup();
    await expect(
      act(a.id, {
        ...request(randomUUID(), b.game.version, { type: "start" }),
        playerId: a.playerId,
      }),
    ).rejects.toMatchObject({ status: 401 });
    await expect(
      act(a.id, request(b.playerToken, b.game.version, { type: "start" })),
    ).rejects.toMatchObject({ status: 400 });
  });
  it("dos acciones simultáneas con la misma versión tienen un solo ganador", async () => {
    const { a, b } = await setup();
    const start = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    const results = await Promise.allSettled([
      act(a.id, request(a.playerToken, start.game.version, { type: "opening-roll" })),
      act(a.id, request(a.playerToken, start.game.version, { type: "opening-roll" })),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    const failure = results.find((r) => r.status === "rejected");
    expect(failure?.status === "rejected" && failure.reason.status).toBe(409);
    const final = await getRoom(a.id, a.playerToken, false);
    expect(final.game.version).toBe(start.game.version + 1);
  });
  it("repetir el mismo requestId no repite el efecto", async () => {
    const { a, b } = await setup();
    const req = request(a.playerToken, b.game.version, { type: "start" });
    const first = await act(a.id, req);
    const second = await act(a.id, req);
    expect(second.game).toEqual(first.game);
  });
  it("uniones concurrentes conservan colores y jugadores distintos", async () => {
    const a = await createRoom({ name: "Ana" });
    const joined = await Promise.all([
      joinRoom(a.id, { name: "Luis" }),
      joinRoom(a.id, { name: "Sol" }),
    ]);
    expect(joined).toHaveLength(2);
    const view = await getRoom(a.id, null, false);
    expect(view.game.players).toHaveLength(3);
    expect(new Set(view.game.players.map((p) => p.color)).size).toBe(3);
  });
  it("reconecta el token existente sin agregar otro jugador", async () => {
    const { a, b } = await setup();
    const again = await joinRoom(a.id, {
      name: "Otra Ana",
      token: a.playerToken,
    });
    expect(again.playerId).toBe(a.playerId);
    expect(again.game.players).toHaveLength(b.game.players.length);
  });
  it("impide entrar después del inicio y devuelve sala no encontrada", async () => {
    const { a, b } = await setup();
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    await expect(joinRoom(a.id, { name: "Tercero" })).rejects.toMatchObject({
      status: 409,
    });
    await expect(getRoom("ZZZZZZ", null, false)).rejects.toMatchObject({
      status: 404,
    });
  });
  it("finaliza la partida vencida al consultarla sin temporizador residente", async () => {
    const a = await createRoom({ name: "Ana", duration: 30 });
    const b = await joinRoom(a.id, { name: "Luis" });
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    const k = `turista:room:${a.id}`;
    const s = JSON.parse(memory.get(k)!);
    s.game.endsAt = Date.now() - 1;
    memory.set(k, JSON.stringify(s));
    const view = await getRoom(a.id, a.playerToken, false);
    expect(view.game.status).toBe("finished");
    expect(view.game.winner).toHaveLength(2);
  });
  it("valida cuerpos, montos, IDs y colores", async () => {
    await expect(createRoom({ name: " " })).rejects.toThrow();
    await expect(createRoom({ name: "Ana", duration: 12 })).rejects.toThrow();
    const { a, b } = await setup();
    await expect(
      act(
        a.id,
        request(a.playerToken, b.game.version, {
          type: "trade",
          to: b.playerId,
          give: [],
          take: [],
          giveMoney: -100,
          takeMoney: 0,
        }),
      ),
    ).rejects.toThrow();
  });
});

it("no acepta que un cliente elija un token nuevo al unirse", async () => {
  const a = await createRoom({ name: "Ana" });
  await expect(
    joinRoom(a.id, { name: "Luis", token: randomUUID() }),
  ).rejects.toMatchObject({ status: 401 });
  expect((await getRoom(a.id, null, false)).game.players).toHaveLength(1);
});

it("compras simultáneas no duplican ni el título ni el dinero",async()=>{
  const {a,b}=await setup();
  const k=`turista:room:${a.id}`;const stored=JSON.parse(memory.get(k)!);
  stored.game.status="playing";stored.game.phase="buy";stored.game.players[0].position=1;
  memory.set(k,JSON.stringify(stored));
  const results=await Promise.allSettled([
    act(a.id,request(a.playerToken,b.game.version,{type:"buy"})),
    act(a.id,request(a.playerToken,b.game.version,{type:"buy"})),
  ]);
  expect(results.filter((r)=>r.status==="fulfilled")).toHaveLength(1);
  const view=await getRoom(a.id,a.playerToken,false);
  expect(view.game.properties[1].owner).toBe(a.playerId);
  expect(view.game.players[0].money).toBe(122500);
});
it("una sala antigua no puede reinterpretarse con precios e índices nuevos",async()=>{
  const {a}=await setup();const k=`turista:room:${a.id}`;const stored=JSON.parse(memory.get(k)!);
  delete stored.game.rulesVersion;memory.set(k,JSON.stringify(stored));
  await expect(getRoom(a.id,a.playerToken,false)).rejects.toMatchObject({status:410});
});
````

## scripts/entrega.mjs

````javascript
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const directories = ["app", "components", "lib", "tests", "scripts", "public/art"];
const files = [
  ".env.example",
  ".gitignore",
  ".vercelignore",
  "package-lock.json",
  "package.json",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile()) files.push(file);
  }
}
for (const directory of directories) await walk(directory);
files.push("README.md");
const tree = {};
for (const file of files) {
  let branch = tree;
  for (const part of file.split("/")) branch = branch[part] ??= {};
}
function render(branch, prefix = "") {
  const entries = Object.entries(branch);
  return entries.flatMap(([name, children], i) => {
    const last = i === entries.length - 1;
    return [
      `${prefix}${last ? "└──" : "├──"} ${name}`,
      ...render(children, `${prefix}${last ? "    " : "│   "}`),
    ];
  });
}
let markdown =
  "```text\nrumbo-mundial/\n" + render(tree).join("\n") + "\n```\n";
for (const file of files) {
  const ext = path.extname(file);
  if (ext === ".webp") { markdown += `\n## ${file}\n\nIlustración original incluida en el proyecto y en el ZIP.\n`; continue; }
  const lang =
    {
      ".ts": "typescript",
      ".tsx": "tsx",
      ".mjs": "javascript",
      ".json": "json",
      ".css": "css",
      ".md": "markdown",
    }[ext] ?? "text";
  markdown += `\n## ${file}\n\n\`\`\`\`${lang}\n${await readFile(file, "utf8")}\`\`\`\`\n`;
}
await writeFile("ENTREGA.md", markdown);
console.log(
  `ENTREGA.md: árbol y ${files.length} archivos completos; README al final.`,
);
````

## public/art/countries/alemania.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/argentina.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/brasil.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/canada.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/chile.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/china.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/colombia.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/costa-rica.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/egipto.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/espana.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/estados-unidos.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/francia.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/guatemala.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/inglaterra.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/italia.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/japon.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/marruecos.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/mexico.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/panama.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/peru.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/rusia.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/sudafrica.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/suiza.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/countries/venezuela.webp

Ilustración original incluida en el proyecto y en el ZIP.

## public/art/PROMPTS.md

````markdown
# Prompts de las ilustraciones de Rumbo Mundial

Método: herramienta integrada image_gen, una generación por imagen. Las fotografías del usuario se usaron solo como referencia temática; no se incorporaron al arte. Optimización WebP sin cambiar el contenido.

## Marruecos

Use case: illustration-story. Create an original high-quality colorful painted travel board-game country illustration for MOROCCO (Marruecos). Landscape 3:2 composition, rich gouache texture, warm inviting light, bold readable silhouette even as a tiny board tile. Moroccan kasbah, ornate ochre gateway, palms, winding desert dunes, a small camel caravan. Beautiful playful detailed editorial illustration, no stereotypes or commercial characters. Fill the image edge to edge; no frame, no letters, no text, no watermark, no logos. This is a real production raster illustration, not a UI mockup.

## EGYPT

Destino: public/art/countries/egipto.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: EGYPT. Landscape 3:2. Subject and composition: Giza pyramids and sphinx, Nile river foreground, papyrus and golden desert light.

## SOUTH AFRICA

Destino: public/art/countries/sudafrica.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: SOUTH AFRICA. Landscape 3:2. Subject and composition: Cape Town and Table Mountain, colorful waterfront, coastal fynbos and a distant safari landscape.

## RUSSIA

Destino: public/art/countries/rusia.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: RUSSIA. Landscape 3:2. Subject and composition: Saint Basil cathedral colorful onion domes, snowy rooftops, birch trees, warm evening light.

## CHINA

Destino: public/art/countries/china.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: CHINA. Landscape 3:2. Subject and composition: Great Wall curving over lush mountains, traditional red-roof pavilion and flowering branches.

## JAPAN

Destino: public/art/countries/japon.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: JAPAN. Landscape 3:2. Subject and composition: Mount Fuji, a red torii gate, cherry blossoms and a lakeside pagoda.

## CANADA

Destino: public/art/countries/canada.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: CANADA. Landscape 3:2. Subject and composition: Canadian Rockies, turquoise lake, red maple leaves, timber lodge and a moose in distance.

## UNITED STATES

Destino: public/art/countries/estados-unidos.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: UNITED STATES. Landscape 3:2. Subject and composition: Statue of Liberty beside New York harbor, art deco skyline, golden coastal light.

## MEXICO

Destino: public/art/countries/mexico.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: MEXICO. Landscape 3:2. Subject and composition: Chichen Itza pyramid, colorful colonial facades, agave and bougainvillea, warm festive travel scene.

## GUATEMALA

Destino: public/art/countries/guatemala.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: GUATEMALA. Landscape 3:2. Subject and composition: Antigua Santa Catalina arch, cobblestone street, distant volcano and lush tropical flowers.

## COSTA RICA

Destino: public/art/countries/costa-rica.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: COSTA RICA. Landscape 3:2. Subject and composition: Arenal volcano, rainforest waterfall, toucan and tropical foliage, vivid green landscape.

## PANAMA

Destino: public/art/countries/panama.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: PANAMA. Landscape 3:2. Subject and composition: Panama Canal ship passing through locks, tropical coast and historic colorful Panama City rooftops.

## COLOMBIA

Destino: public/art/countries/colombia.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: COLOMBIA. Landscape 3:2. Subject and composition: Cartagena colonial balconies and clock tower, coffee hills, colorful tropical blossoms.

## VENEZUELA

Destino: public/art/countries/venezuela.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: VENEZUELA. Landscape 3:2. Subject and composition: Angel Falls plunging from dramatic tepui cliffs, lush jungle, scarlet macaw.

## PERU

Destino: public/art/countries/peru.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: PERU. Landscape 3:2. Subject and composition: Machu Picchu terraces with dramatic Andean peaks, llama and bright native flowers.

## BRAZIL

Destino: public/art/countries/brasil.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: BRAZIL. Landscape 3:2. Subject and composition: Rio de Janeiro Sugarloaf mountain and Christ statue silhouette, Copacabana coast, palms and tropical flowers.

## CHILE

Destino: public/art/countries/chile.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: CHILE. Landscape 3:2. Subject and composition: Torres del Paine granite peaks, blue glacial lake, southern wildflowers and small guanaco.

## ARGENTINA

Destino: public/art/countries/argentina.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: ARGENTINA. Landscape 3:2. Subject and composition: Buenos Aires colorful La Boca houses, tango couple small in foreground, jacaranda and distant mountain postcard details.

## SPAIN

Destino: public/art/countries/espana.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: SPAIN. Landscape 3:2. Subject and composition: Seville Plaza de Espana arches and tiled canal, orange trees, sunlit terracotta rooftops.

## FRANCE

Destino: public/art/countries/francia.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: FRANCE. Landscape 3:2. Subject and composition: Paris Eiffel Tower, Seine bridge, cafe flower boxes and elegant stone rooftops.

## ENGLAND

Destino: public/art/countries/inglaterra.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: ENGLAND. Landscape 3:2. Subject and composition: London Big Ben and Westminster over Thames, red double decker bus, stone bridge and English garden flowers.

## ITALY

Destino: public/art/countries/italia.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: ITALY. Landscape 3:2. Subject and composition: Rome Colosseum with cypress trees, terracotta buildings and small fountain, golden Mediterranean light.

## SWITZERLAND

Destino: public/art/countries/suiza.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: SWITZERLAND. Landscape 3:2. Subject and composition: Matterhorn over alpine wooden chalets and flower meadows, turquoise lake and small red mountain train.

## GERMANY

Destino: public/art/countries/alemania.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: GERMANY. Landscape 3:2. Subject and composition: Bavarian Neuschwanstein castle, half timber village, forest and mountain lake.

## WORLD TRAVEL MAP

Destino: public/art/world-center.webp

Use case: illustration-story. Original production raster asset for Rumbo Mundial travel board game. Rich detailed hand-painted gouache travel poster, expressive brush textures, charming polished colorful illustration, inviting golden light, sophisticated teal and ochre accents. Strong landmark silhouette legible at small sizes. Full bleed, no border, no text, no letters, no logos, no watermark, no commercial characters. Asset: WORLD TRAVEL MAP. Square 1:1. Subject and composition: A beautiful square illustrated world map centered on continents, Americas on left, Europe Africa in middle, Asia on right, Australia lower right. Recognizable approximate continent outlines with tiny original landmarks: Eiffel Tower, pyramids, Mount Fuji, Statue of Liberty, Chichen Itza, Machu Picchu, Sydney Opera House. Curved dotted airplane routes on turquoise ocean. Delicate compass rose bottom left. Keep a calm ocean area near center for a small UI title overlay. No board tiles, no card decks, no text at all; continent names will be HTML labels..


````

## public/art/world-center.webp

Ilustración original incluida en el proyecto y en el ZIP.

## README.md

````markdown
# Rumbo Mundial

Juego de mesa multijugador en español de México, con Next.js App Router, TypeScript estricto, Tailwind y Upstash Redis. Conserva los nombres y posiciones de los países del tablero de referencia aportado por el usuario, con ilustraciones SVG, billetes, casas, hoteles y textos de cartas creados en código. No muestra las fotografías ni utiliza logotipos o personajes del producto de referencia.

## Ejecutar el proyecto

Necesitas Node.js 22 y las credenciales de Redis que ya configuraste. No hay servidor adicional ni base SQL.

```sh
npm ci
cp .env.example .env.local
```

En `.env.local`, coloca el REST URL y REST TOKEN de Upstash:

```dotenv
UPSTASH_REDIS_REST_URL=https://TU_BASE.upstash.io
UPSTASH_REDIS_REST_TOKEN=TU_TOKEN
```

También se aceptan `KV_REST_API_URL` y `KV_REST_API_TOKEN`. No agregues `NEXT_PUBLIC_` a estas variables ni publiques `.env.local`.

```sh
npm run dev
```

Abre `http://localhost:3000`. Redis es indispensable para compartir salas en Vercel: las funciones serverless no conservan estado entre solicitudes. La aplicación no utiliza almacenamiento del servidor en memoria o archivos, WebSockets, Socket.io ni un proceso residente.

## Actualizar tu despliegue existente en Vercel

1. Sube los archivos modificados a la rama de producción de tu repositorio, normalmente `main`.
2. Vercel generará un despliegue automáticamente. Si subiste el proyecto con CLI, ejecuta `npx vercel --prod` desde esta carpeta.
3. Conserva las variables de Upstash en **Settings → Environment Variables**, habilitadas para Production. Si cambias variables, crea un nuevo despliegue para aplicarlas.
4. Abre la URL y **crea una sala nueva**. Las salas del tablero anterior se rechazan con un mensaje explícito para evitar mezclar países, posiciones y precios.

Las fotografías de referencia se conservan localmente en `public`, pero `.vercelignore` excluye sus seis carpetas del despliegue. No se cargan desde la interfaz. El proyecto no necesita esas fotos para compilar o funcionar. Los archivos de entrega también excluyen fotos y credenciales.

## Publicar por primera vez desde GitHub

Crea un repositorio vacío y ejecuta estos comandos, sustituyendo la URL por la tuya:

```sh
git init
git add .
git commit -m "Implementa Rumbo Mundial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/rumbo-mundial.git
git push -u origin main
```

En Vercel, importa el repositorio como proyecto Next.js. Usa la carpeta del proyecto como Root Directory. Desde Marketplace agrega o conecta Upstash Redis y comprueba que haya uno de los pares de variables admitidos. También puedes copiarlas manualmente desde Upstash. Habilítalas para Production y, si lo necesitas, Preview y Development. Ejecuta Deploy. No hace falta configurar otro backend.

## Aparecer en Google

La portada está preparada para búsquedas como **turista mundial online** y **jugar con amigos**: título y descripción, encabezado y contenido visible, datos estructurados del sitio, imagen para compartir, URL canónica, `robots.txt` y `sitemap.xml`. Las salas llevan `noindex` y no aparecen en el sitemap. Los despliegues Preview de Vercel y el servidor de desarrollo no permiten indexación. Esto no cambia las reglas ni el acceso a las partidas.

La dirección principal configurada es `https://rumbo-mundial-khaki.vercel.app/`. Si cambias de dominio, define `SITE_URL` en Vercel con la nueva URL pública y vuelve a desplegar. Usa siempre el dominio principal, no un enlace temporal de Preview. La configuración opcional es:

```dotenv
SITE_URL=https://rumbo-mundial-khaki.vercel.app
GOOGLE_SITE_VERIFICATION=
```

Después de desplegar:

1. Comprueba que la portada se abre sin iniciar sesión en Vercel y que funcionan [robots.txt](https://rumbo-mundial-khaki.vercel.app/robots.txt) y [sitemap.xml](https://rumbo-mundial-khaki.vercel.app/sitemap.xml).
2. Abre [Google Search Console](https://search.google.com/search-console), agrega una propiedad de **prefijo de URL** con `https://rumbo-mundial-khaki.vercel.app/` y elige la verificación por **etiqueta HTML**.
3. Copia únicamente el valor `content` de esa etiqueta en `GOOGLE_SITE_VERIFICATION` en las variables de Production de Vercel. Despliega de nuevo y pulsa **Verificar** en Search Console. La etiqueta de verificación es pública; no es una contraseña.
4. En **Sitemaps**, envía `sitemap.xml`. En **Inspección de URLs**, introduce la URL principal y solicita la indexación. Después consulta el rendimiento y las búsquedas reales en Search Console.

El código prepara el sitio, pero no registra automáticamente la propiedad en Search Console ni garantiza que Google lo indexe o lo coloque primero. Google no utiliza la etiqueta `meta keywords`; por eso las palabras clave se incorporan de forma natural al contenido y los títulos. Consulta la [guía oficial de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). La indexación y los cambios de posición pueden tardar; no hay un plazo garantizado.

## Probar con amigos

1. Abre la página en dos perfiles distintos: dos navegadores o una ventana normal y otra privada.
2. Crea una sala; comparte el ID o el enlace. Cada participante elige nombre y color.
3. El anfitrión inicia. Cada jugador tira **un dado de salida**; el mayor comienza. Los empatados repiten.
4. Tira los dados y selecciona una casilla para abrir su título. Todos ven las tiradas, cartas y compras.
5. Compra seleccionando los billetes con un toque, o envía la propiedad a subasta. Las ofertas válidas se guardan en Redis; al terminar el plazo o retirarse los demás se adjudica automáticamente.
6. Refresca la página: debes seguir en tu mismo asiento. El token se conserva en localStorage. No compartas ese token ni borres los datos del navegador si quieres reconectarte.
7. Abre **Proponer trato**; el destinatario verá la propuesta y podrá aceptarla o rechazarla. Se puede negociar fuera del turno propio, excepto desde la cárcel o mientras haya un pago/subasta pendiente.
8. Completa un bloque y construye casas de forma pareja. Revisa la lista y cantidad de propiedades de los demás.
9. Al pasar por Salida, pulsa **Cobrar sueldo** antes de ceder el turno.
10. Cierra la pestaña de quien debe responder. Tras 90 segundos, el anfitrión puede saltarlo cuando sea posible o declararlo en quiebra. Las subastas vencen por su propio plazo.

El zoom permite ver el tablero completo en un teléfono o ampliar para leer casillas. Las animaciones respetan la preferencia de movimiento reducido. El sonido es opcional.

## Reglas implementadas

- 40 casillas, 24 países en ocho bloques, cuatro aerolíneas, Embajada y Consulado. Recorrido antihorario: Salida → Marruecos → Egipto. México es una propiedad, no la salida.
- Capital inicial de **$134,500**: dos billetes de $50,000, dos de $10,000, dos de $5,000, uno de $2,000, dos de $1,000 y uno de $500. El Banco da cambio y emite dinero sin límite. Hay denominaciones menores para intereses.
- Sueldo de **$20,000**, reclamable en el turno correspondiente. No se obtiene por el traslado de deportación/cárcel.
- Dobles dan un tiro extra. El tercer doble envía a Deportado.
- Caer con dados en Deportado es una visita. Ser enviado allí permite pagar **$5,000** o perder tres turnos completos; después se vuelve a Salida sin sueldo. Se pueden administrar propiedades durante la deportación.
- Cárcel cobra **$10,000** de fianza y exige tres turnos completos, salvo una carta que indique otra duración. Los dobles no liberan. No permite rentas ni administración voluntaria. El pase diplomático cancela la detención y la fianza que siga pendiente.
- Australia es descanso al caer con dados. Una carta puede imponer una estancia adicional.
- Renta según el título; base doble con bloque completo, cero en una propiedad hipotecada. Aerolíneas: $2,500 / $5,000 / $10,000 / $20,000. Embajada y Consulado: dados × $500 o × $1,000 al tener ambas.
- Compra al Banco o subasta, incluso para quien rechazó la compra. Oferta mínima $500; incrementos mínimos de $500. Primera ronda de 30 s; una nueva oferta concede 20 s. Los jugadores en cárcel no participan. La oferta ganadora se paga automáticamente.
- Construcción uniforme en bloques completos sin hipotecas, hasta cuatro casas y un hotel. El hotel sustituye cuatro casas y cuesta una construcción más. Venta al Banco a mitad del costo. Se permite administrar fuera del turno.
- Inventario finito de 36 casas y 12 hoteles. Si queda una pieza y varios jugadores tienen países preparados, se subasta entre ellos. Si no hay piezas, se espera. **Vender edificios del bloque** permite liquidar todos a mitad de costo cuando no hay cuatro casas para deshacer un hotel.
- Hipoteca por la mitad del precio; liberación con 10% de interés. No se puede hipotecar/intercambiar una propiedad de un bloque con edificios. Devolver una propiedad hipotecada no genera un segundo pago.
- Tratos de propiedades y dinero revalidados al aceptar. No hay préstamos entre jugadores. Las propuestas sobreviven al cambio de turno; una aceptación invalida las demás para evitar ofertas desactualizadas.
- Dos mazos de 16 cartas, barajados con aleatoriedad criptográfica en cada partida. Incluyen cobros, pagos, pagos colectivos, viajes, reparaciones, pausas, permisos, bono de renta, devolución de compras y expropiaciones. Las cartas ordinarias vuelven al fondo; los permisos se conservan hasta usarlos. Textos originales; no son una transcripción de las cartas comerciales.
- Toda deuda queda pendiente hasta pagar o liquidar activos. Los pagos colectivos se procesan en cola identificando a cada deudor, incluso fuera de turno. Solo se admite quiebra cuando ni la liquidación cubriría la obligación.
- Al quebrar, los edificios se liquidan a mitad de precio. El acreedor recibe el efectivo y bienes; paga al Banco el 10% del valor original de las propiedades heredadas hipotecadas. Puede redimir pagando solo el principal durante ese turno; después vuelve a aplicar el interés normal. Si el acreedor es el Banco, los títulos se subastan mientras siga la partida.
- Gana el último superviviente. El modo de 30/60/90 minutos compara patrimonio neto: efectivo + precios originales + costo de edificios − hipotecas − deudas. Empates comparten puesto. Los quebrados aparecen detrás, del último eliminado al primero.

## Criterios de adaptación y referencias contradictorias

Los datos numéricos y nombres están centralizados en `lib/game/board.ts`. El documento de referencia original del usuario permanece en `reglas_turista_mundial.md` sin modificaciones. Para obtener un reglamento consistente:

- La sección general del instructivo dice que caer con dados en Deportado es visita; la sección dedicada dice “por algún motivo”. Se aplica visita para dados y castigo al ser enviado por carta o tercer doble.
- El ejemplo del instructivo agrupa Chile/Argentina/Perú, pero los títulos fotografiados agrupan **Brasil/Chile/Argentina** y **Colombia/Venezuela/Perú**. Se siguen los títulos.
- México vale $26,000 en el tablero; se aplica hipoteca de $13,000, coherente con la regla del 50%, aunque uno de sus reversos fotografiados indique $12,000.
- Se conservan valores inusuales impresos en títulos: Japón con tres casas $144,000; Brasil con cuatro casas $112,000. No se sustituyen por una progresión inventada.
- La transcripción no fija el número de piezas ni el protocolo digital de subasta. El inventario y los plazos indicados arriba son parámetros de esta adaptación. La subasta de edificios se activa con la última pieza disponible.
- Para que la fianza no bloquee una partida, la cárcel permite liquidación forzosa destinada a pagar una deuda, pero no gestión voluntaria ni cobro de rentas.
- Las cartas con pruebas físicas se sustituyen por efectos digitales. Algunas cartas también tienen ajustes explícitos en su nuevo texto. El permiso de adquisición exige completar un bloque sin edificios y usa la renta base del título como precio frente a otro propietario.
- La partida por tiempo utiliza patrimonio neto, descontando hipotecas y deudas para que endeudarse no aumente artificialmente el resultado.

El nombre nuevo y el arte propio no constituyen una comprobación de disponibilidad de marca ni una garantía legal.

## Comprobar el código

```sh
npm test
npm run lint
npm run build
```

La suite cubre tablero, precios, sueldo, construcción uniforme, inventario, hipotecas, detenciones, cartas, subastas, tratos, pagos, quiebra, ranking, tres partidas simuladas completas, tokens, reconexión, idempotencia y compras simultáneas. Los tests del almacén usan un doble de Redis **solo en pruebas**; la aplicación sigue usando exclusivamente Redis real.

Para verificar los Route Handlers contra Redis real con el servidor abierto:

```sh
npm run test:api
```

O contra tu despliegue:

```sh
TEST_BASE_URL=https://TU_PROYECTO.vercel.app npm run test:api
```

Esta prueba crea una sala de dos jugadores, valida tokens, reconexión, polling sin cambios y una carrera de solicitudes. No borra salas existentes; la sala de prueba expira en 24 horas. No reemplaza la prueba visual entre navegadores.

En el entorno de esta entrega se ejecutaron las pruebas, lint y compilación. La prueba visual y de API contra Redis real debe hacerse en tu equipo o despliegue: el entorno de edición no permite abrir el puerto del servidor ni ejecutar el navegador.

## Arquitectura

- `lib/game/engine.ts`: reducer determinista. Recibe dados, mazos y hora del servidor; nunca usa reloj o aleatoriedad propios.
- `lib/game/board.ts`, `cards.ts`, `rules.ts`, `money.ts`: datos y reglas centralizados.
- `lib/store.ts`: Redis REST, tokens UUID almacenados como hashes, control de versiones, recibos de idempotencia y presencia.
- `app/api/rooms/**`: Route Handlers dinámicos, runtime Node.js, respuestas sin caché.
- `components/Room.tsx`: polling secuencial cada segundo, pausa al ocultar pestaña, heartbeat cada 20 s y reconexión por token.
- `components/TravelArt.tsx`: ilustraciones originales de globo, billetes y edificios en SVG/CSS. No descarga imágenes ni fuentes externas.
- `components/Board.tsx`: recorrido de fichas por eventos, casilla por casilla, sin repetir movimientos al refrescar.
- `components/Activity.tsx`: escenas centrales compartidas, dados animados y fondo desenfocado. La bitácora no se muestra; el servidor conserva eventos para sincronizar las escenas. La cartera se presenta como una mano de billetes en la parte inferior.

Las escrituras usan un único script Lua que compara la versión y guarda el nuevo estado atómicamente. Una carrera pierde con HTTP 409. La caducidad de sala se renueva a 24 horas en cada acción guardada. Cada acción lleva un `requestId`; se conservan los últimos 100 recibos para no duplicar efectos al repetir solicitudes. Los mazos y los tokens no se incluyen en el estado público. No se confía en un playerId enviado por el cliente.

El vencimiento de partidas y subastas se resuelve durante la siguiente consulta o acción usando la hora del servidor, sin cron ni temporizadores persistentes. Los espectadores pueden leer, pero necesitan un token válido para actuar. El código conserva el prefijo interno `turista:` en las claves y en localStorage por compatibilidad; la presentación usa Rumbo Mundial.

## Entrega completa

`npm run entrega` genera `ENTREGA.md` con árbol y código completo archivo por archivo, README al final. El archivo `rumbo-mundial.zip` contiene el proyecto desplegable sin credenciales, dependencias instaladas, compilaciones o fotografías de referencia.

## Ilustraciones de los países y del mapa

Los 24 países usan ilustraciones raster originales, generadas individualmente con la herramienta integrada de imágenes. Cada casilla y tarjeta reutiliza la imagen correspondiente en `public/art/countries/`. `public/art/world-center.webp` es el mapa central ilustrado, con rótulos de regiones renderizados en HTML. El mapeo de países se encuentra en `lib/game/art.ts`; los prompts completos están en `public/art/PROMPTS.md`. Se entregan en WebP y se sirven con `next/image`. No requieren generación de imágenes, claves adicionales ni servicios gráficos cuando juegas.
````
