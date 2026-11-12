/* CSV list values use semicolons; JSON list values may also be arrays. */
globalThis.MentorProfile=(()=>{
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=value=>String(value??'').trim();
const list=value=>(Array.isArray(value)?value:[value]).flatMap(v=>text(v).split(';')).map(v=>v.trim()).filter(Boolean);
const line=(values,separator=' · ')=>{const content=values.map(text).filter(Boolean).join(separator);return content?`<small>${escape(content)}</small>`:'';};
const tags=value=>list(value).map(v=>`<span class="tag">${escape(v)}</span>`).join(' ');
const field=(label,value)=>{const values=list(value);return values.length?`<dt>${label}</dt><dd>${values.map(escape).join('<br>')}</dd>`:'';};
function link(value,label){if(!text(value))return '';try{const url=new URL(value);if(!['http:','https:'].includes(url.protocol))return '';return `<a href="${escape(url.href)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;}catch{return '';}}
function html(m){const year=text(m.graduation_year);const email=text(m.email);const contact=email?`<dt>Email</dt><dd><a href="mailto:${escape(encodeURIComponent(email))}">${escape(email)}</a></dd>`:'';const links=link(m.linkedin,'LinkedIn')+link(m.website,'Website');const details=field('Education',m.degrees)+field('Happy to help with',m.interests)+contact+field('Phone',m.phone);return `<span class="eyebrow">SCHOLAR CONNECTION${year?' · CLASS OF '+escape(year):''}</span><h2>${escape(m.name||'Scholar')}</h2>${line([m.role,m.organization])}${line([m.city,m.region,m.country],', ')}${tags(m.specialization)}${text(m.bio)?`<p>${escape(m.bio)}</p>`:''}${details?`<dl>${details}</dl>`:''}${links?`<div class="links">${links}</div>`:''}`;}
return {list,line,tags,html};
})();
