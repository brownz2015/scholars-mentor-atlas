globalThis.MentorSearch=(()=>{
  function normalize(value){
    return String(value??'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase()
      .replace(/[.’']/g,'')
      .replace(/\bdoctor\s+of\s+philosophy\b/g,'phd')
      .replace(/\bbachelors?\s+(?:of|in)\s+arts\b/g,'ba')
      .replace(/\bbachelors?\s+(?:of|in)\s+science\b/g,'bs')
      .replace(/\bmasters?\s+(?:of|in)\s+arts\b/g,'ma')
      .replace(/\bmasters?\s+(?:of|in)\s+science\b/g,'ms')
      .replace(/\bmasters?\s+(?:of|in)\s+public\s+health\b/g,'mph')
      .replace(/\bmasters?\s+(?:of|in)\s+public\s+policy\b/g,'mpp')
      .replace(/\bjuris\s+doctor\b/g,'jd')
      .replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  }
  // One insertion, deletion, substitution, or adjacent transposition.
  function near(a,b){
    if(Math.abs(a.length-b.length)>1)return false;
    let i=0;while(i<a.length&&i<b.length&&a[i]===b[i])i++;
    if(i===a.length||i===b.length)return true;
    if(a.length===b.length)return a.slice(i+1)===b.slice(i+1)||
      (a[i]===b[i+1]&&a[i+1]===b[i]&&a.slice(i+2)===b.slice(i+2));
    return a.length>b.length?a.slice(i+1)===b.slice(i):a.slice(i)===b.slice(i+1);
  }
  const fields=['name','city','region','country','specialization','degrees','graduation_year','organization','role','email','phone','linkedin','website','interests','bio'];
  function matches(record,query){
    const terms=normalize(query).split(/\s+/).filter(Boolean);
    if(!terms.length)return true;
    const words=fields.flatMap(field=>normalize(Array.isArray(record[field])?record[field].join(' '):record[field]).split(/\s+/)).filter(Boolean);
    return terms.every(term=>words.some(word=>word===term||
      (term.length>=3&&word.includes(term))||
      (term.length>=5&&word.length>=5&&near(term,word))));
  }
  return {normalize,matches};
})();
