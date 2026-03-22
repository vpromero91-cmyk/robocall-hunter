# 🎯 RoboCall Hunter

Turn spam calls into cash. $500 per violation under the TCPA.

## Quick Start

1. **Open the app:**
   ```bash
   # Just double-click index.html or:
   open index.html
   ```

2. **When you get a spam call:**
   - Answer with the 30-second script
   - Immediately log it in the app
   - Done in under 10 seconds

3. **Monthly batch:**
   - Export your calls
   - Generate demand letters
   - Send and wait for checks

## The 30-Second Script

```
"Hello, who's calling?"
[Let them pitch for 10 seconds]
"What company is this?"
[They answer]
"Put me on your do-not-call list."
[Hang up]
```

**That's it.** You now have:
- Confirmed it was a sales call
- The company name (even if fake, you have the number)
- Documented revocation of consent

## Your Stats

The app tracks:
- **Total calls logged** → Each one = $500 potential
- **Potential value** → Total if all settle
- **Unique callers** → How many demand letters to send

## Exporting for Action

When you're ready to send demand letters:

1. Open browser console (F12 → Console)
2. Run: `copy(JSON.parse(localStorage.getItem('robocallHunter_calls')))`
3. Save to `calls.json`
4. Run: `node export.js calls.json`
5. Get `calls.csv` and `demand-letters/*.txt`

## The Process

```
Spam Call → Log It → Research → Demand Letter → Settlement/Small Claims → $500
```

**Timeline:**
- Week 1-4: Log calls, build your list
- Week 5: Send demand letters
- Week 9-12: Settlements come in (or file small claims)

## Legal Basics

- **TCPA:** Telephone Consumer Protection Act
- **Damages:** $500 per call (willful violations = $1,500)
- **DNC List:** Must be registered first
- **Small Claims:** No lawyer needed, designed for regular people

## Tips

- **Record calls** if legal in your state (check local laws)
- **Document everything** in the notes field
- **Be polite** on calls — you're gathering evidence, not arguing
- **Batch process** — don't send one letter at a time

## Next Features (Coming Soon)

- [ ] Auto-research phone numbers
- [ ] Integration with FCC complaint database
- [ ] Small claims court form auto-fill
- [ ] Settlement tracking
- [ ] Tax form generation (1099s for settlement income)

---

**Remember:** This is legal arbitrage, not a get-rich-quick scheme. Do the work, document everything, get paid.
