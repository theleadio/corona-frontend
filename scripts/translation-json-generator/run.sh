#! bash
GOOGLE_SHEET_ID="12_yx09THl9qcBboJvvBwPTY63MfKIIB8WzEDstIOI6s"
GID="0"

# Download google sheet and save
curl -o "CoronaTracker - Translation - Sheet1.csv" "https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?gid=${GID}&format=csv"

python3 lang-generator.py -c b en.js \
&& mv en.js ../../lang \
&& python3 lang-generator.py -c d ms.js \
&& mv ms.js ../../lang \
&& python3 lang-generator.py -c e zh-hans.js \
&& mv zh-hans.js ../../lang \
&& python3 lang-generator.py -c f zh-hant.js \
&& mv zh-hant.js ../../lang \
&& python3 lang-generator.py -c g ja.js \
&& mv ja.js ../../lang \
&& python3 lang-generator.py -c h ar.js \
&& mv ar.js ../../lang \
&& python3 lang-generator.py -c j id.js \
&& mv id.js ../../lang \
&& python3 lang-generator.py -c k sv.js \
&& mv sv.js ../../lang \
&& python3 lang-generator.py -c l tl.js \
&& mv tl.js ../../lang \
&& python3 lang-generator.py -c m es-mx.js \
&& mv es-mx.js ../../lang \
&& python3 lang-generator.py -c n de.js \
&& mv de.js ../../lang \
&& python3 lang-generator.py -c o my.js \
&& mv my.js ../../lang \
&& python3 lang-generator.py -c p pl.js \
&& mv pl.js ../../lang \
&& python3 lang-generator.py -c q it.js \
&& mv it.js ../../lang \
&& python3 lang-generator.py -c r hi.js \
&& mv hi.js ../../lang \
&& python3 lang-generator.py -c s ur.js \
&& mv ur.js ../../lang \
&& python3 lang-generator.py -c t vi.js \
&& mv vi.js ../../lang \
&& python3 lang-generator.py -c u pt-br.js \
&& mv pt-br.js ../../lang \
&& python3 lang-generator.py -c v ta.js \
&& mv ta.js ../../lang \
&& python3 lang-generator.py -c w fr.js \
&& mv fr.js ../../lang \
&& python3 lang-generator.py -c x ilo.js \
&& mv ilo.js ../../lang \
&& python3 lang-generator.py -c y bik.js \
&& mv bik.js ../../lang \
&& python3 lang-generator.py -c z ro.js \
&& mv ro.js ../../lang \
