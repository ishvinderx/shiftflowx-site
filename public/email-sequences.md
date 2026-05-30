# ShiftFlow Email Sequences

---

## Email 1: Welcome (Send Immediately After Signup)

**Subject:** Welcome to ShiftFlow, {{first_name}} 👋  
**From:** team@shiftflow.app  
**Send timing:** Immediately after account creation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to ShiftFlow</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #1a1f36; padding: 32px 40px; text-align: center; }
    .header img { height: 36px; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 16px 0 0; font-weight: 600; }
    .body { padding: 36px 40px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .steps { margin: 24px 0; }
    .step { display: flex; align-items: flex-start; margin-bottom: 18px; }
    .step-num { background: #6366f1; color: #fff; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; margin-right: 14px; margin-top: 2px; }
    .step-text { color: #374151; font-size: 15px; line-height: 1.6; }
    .step-text strong { color: #111827; }
    .cta-wrap { text-align: center; margin: 32px 0 8px; }
    .cta { background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 14px 32px; font-size: 15px; font-weight: 600; display: inline-block; }
    .footer { background: #f9fafb; padding: 20px 40px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>You're in. Let's protect your paycheck. 💸</h1>
    </div>
    <div class="body">
      <p>Hey {{first_name}},</p>
      <p>Welcome to ShiftFlow — the app built for people who work hard and deserve every dollar they earn. You've got 30 days to explore everything, completely free.</p>
      <p>Here are 3 things to do in your first 24 hours:</p>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Log your first shift.</strong> Tap the + button and add today's or your last shift. It takes under 30 seconds.</div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Set your pay schedule.</strong> Tell ShiftFlow when you get paid — weekly, bi-weekly, or variable — and watch the payday countdown kick in.</div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Do your first daily check-in.</strong> It takes 10 seconds and starts building your burnout protection baseline right away.</div>
        </div>
      </div>
      <p>Questions? Just reply to this email — a real human reads every message.</p>
      <div class="cta-wrap">
        <a href="https://shiftflow.app/open" class="cta">Open ShiftFlow →</a>
      </div>
    </div>
    <div class="footer">
      <p>You're receiving this because you signed up for ShiftFlow.<br />© 2026 ShiftFlow · <a href="https://shiftflow.app/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
```

---

## Email 2: Day 3 — First Check-In Nudge

**Subject:** Have you logged your first shift? ⏰  
**From:** team@shiftflow.app  
**Send timing:** 3 days after signup (skip if user has logged a shift)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Log Your First Shift</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #1a1f36; padding: 28px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 20px; margin: 0; font-weight: 600; }
    .body { padding: 36px 40px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .highlight-box { background: #eff6ff; border-left: 4px solid #6366f1; border-radius: 6px; padding: 16px 20px; margin: 24px 0; }
    .highlight-box p { color: #1e40af; font-size: 14px; margin: 0; line-height: 1.6; }
    .cta-wrap { text-align: center; margin: 32px 0 8px; }
    .cta { background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 14px 32px; font-size: 15px; font-weight: 600; display: inline-block; }
    .footer { background: #f9fafb; padding: 20px 40px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Your payday countdown is waiting for you 🕐</h1>
    </div>
    <div class="body">
      <p>Hey {{first_name}},</p>
      <p>Three days in — and we noticed you haven't logged your first shift yet. No worries. We know life is busy, especially when you're working the hours you do.</p>
      <p>But here's the thing: the sooner you log even one shift, the sooner ShiftFlow can start doing the heavy lifting for you — tracking your hours, predicting your payday, and watching for payroll errors on your behalf.</p>
      <div class="highlight-box">
        <p>💡 <strong>The check-in habit takes less than 30 seconds a day.</strong> Users who check in daily for just one week report catching payroll discrepancies they never would have noticed otherwise.</p>
      </div>
      <p>You told us you want to {{onboarding_goal}} — and that starts with one tap. Let's get your first shift on the board.</p>
      <div class="cta-wrap">
        <a href="https://shiftflow.app/log-shift" class="cta">Log My First Shift →</a>
      </div>
      <p style="font-size: 13px; color: #9ca3af; margin-top: 20px; text-align: center;">You've got 27 days left in your free trial. Make them count.</p>
    </div>
    <div class="footer">
      <p>© 2026 ShiftFlow · <a href="https://shiftflow.app/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
```

---

## Email 3: Day 7 Inactivity — Win Back

**Subject:** Your payday might be wrong 🚨  
**From:** team@shiftflow.app  
**Send timing:** 7 days after signup if no shifts logged and no app opens in last 4 days

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payroll Errors Are Common</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #dc2626; padding: 28px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 20px; margin: 0; font-weight: 600; }
    .body { padding: 36px 40px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .stat-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px 24px; margin: 24px 0; text-align: center; }
    .stat-box .stat { font-size: 36px; font-weight: 800; color: #dc2626; }
    .stat-box p { color: #7f1d1d; font-size: 13px; margin: 4px 0 0; }
    .feature-line { display: flex; align-items: flex-start; margin-bottom: 14px; }
    .feature-line span.icon { font-size: 18px; margin-right: 12px; flex-shrink: 0; }
    .feature-line p { color: #374151; font-size: 14px; margin: 0; line-height: 1.6; }
    .cta-wrap { text-align: center; margin: 32px 0 8px; }
    .cta { background: #dc2626; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 14px 32px; font-size: 15px; font-weight: 600; display: inline-block; }
    .footer { background: #f9fafb; padding: 20px 40px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>54% of workers have been underpaid at least once.</h1>
    </div>
    <div class="body">
      <p>Hey {{first_name}},</p>
      <p>That's not a scare tactic — it's from a 2023 payroll industry report. And most of those workers never found out, because they didn't have a tool watching their paychecks.</p>
      <div class="stat-box">
        <div class="stat">$2,000+</div>
        <p>Average annual loss to payroll errors per hourly worker (APA, 2023)</p>
      </div>
      <p>ShiftFlow's Payroll Protection feature was built specifically for this. Every time you log a shift, it cross-references your hours, overtime rules, and deductions — and flags anything that doesn't add up.</p>
      <div class="feature-line">
        <span class="icon">🔍</span>
        <p><strong>Missing overtime?</strong> ShiftFlow catches it automatically.</p>
      </div>
      <div class="feature-line">
        <span class="icon">📋</span>
        <p><strong>Incorrect deductions?</strong> It flags them before you cash the check.</p>
      </div>
      <div class="feature-line">
        <span class="icon">📱</span>
        <p><strong>Takes 30 seconds to set up.</strong> Then it runs in the background.</p>
      </div>
      <p>You've still got 23 days of your free trial left. Let's use them to make sure your next paycheck is exactly what it should be.</p>
      <div class="cta-wrap">
        <a href="https://shiftflow.app/protection" class="cta">Check My Payroll Now →</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 ShiftFlow · <a href="https://shiftflow.app/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
```

---

## Email 4: Trial Ending — 3 Days Before Expiry

**Subject:** Your free trial ends in 3 days  
**From:** team@shiftflow.app  
**Send timing:** 27 days after signup (3 days before trial end)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trial Ending Soon</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #1a1f36; padding: 28px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 20px; margin: 0; font-weight: 600; }
    .body { padding: 36px 40px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .stats-row { display: flex; gap: 12px; margin: 24px 0; }
    .stat-card { flex: 1; background: #f9fafb; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #e5e7eb; }
    .stat-card .value { font-size: 26px; font-weight: 800; color: #6366f1; display: block; }
    .stat-card .label { font-size: 12px; color: #6b7280; margin-top: 4px; display: block; }
    .pricing-box { background: #f5f3ff; border: 1px solid #c4b5fd; border-radius: 10px; padding: 24px; margin: 24px 0; text-align: center; }
    .pricing-box h2 { color: #4c1d95; font-size: 18px; margin: 0 0 8px; }
    .pricing-box .price { font-size: 28px; font-weight: 800; color: #6366f1; }
    .pricing-box .price sub { font-size: 14px; font-weight: 400; color: #6b7280; }
    .pricing-box .alt { font-size: 13px; color: #7c3aed; margin: 8px 0 0; }
    .cta-wrap { text-align: center; margin: 20px 0 8px; }
    .cta { background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 14px 32px; font-size: 15px; font-weight: 600; display: inline-block; }
    .note { font-size: 13px; color: #9ca3af; text-align: center; margin-top: 16px; }
    .footer { background: #f9fafb; padding: 20px 40px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Look how far you've come, {{first_name}}.</h1>
    </div>
    <div class="body">
      <p>Your 30-day free trial ends on <strong>{{trial_end_date}}</strong>. Before it does, here's a quick look at what ShiftFlow tracked for you this month:</p>
      <div class="stats-row">
        <div class="stat-card">
          <span class="value">{{shifts_logged}}</span>
          <span class="label">Shifts Logged</span>
        </div>
        <div class="stat-card">
          <span class="value">${{income_tracked}}</span>
          <span class="label">Income Tracked</span>
        </div>
        <div class="stat-card">
          <span class="value">{{checkins_done}}</span>
          <span class="label">Check-Ins Done</span>
        </div>
      </div>
      <p>That's real data — your actual working life, organized and protected. When your trial ends, access to Payroll Protection, AI payday prediction, and your full earnings history pauses.</p>
      <p>To keep it all going, it's less than a coffee a week:</p>
      <div class="pricing-box">
        <h2>Continue with ShiftFlow</h2>
        <div class="price">$9.99 <sub>/ month</sub></div>
        <div class="alt">Or save 17% — just $99.99/year (that's $8.33/month)</div>
      </div>
      <div class="cta-wrap">
        <a href="https://shiftflow.app/upgrade" class="cta">Keep My ShiftFlow →</a>
      </div>
      <p class="note">No pressure — if you'd rather not continue, your data stays safe for 60 days and you can export it anytime.</p>
    </div>
    <div class="footer">
      <p>© 2026 ShiftFlow · <a href="https://shiftflow.app/unsubscribe" style="color: #9ca3af;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
```

---

## Template Variables Reference

| Variable | Description | Used In |
|---|---|---|
| `{{first_name}}` | User's first name | All emails |
| `{{onboarding_goal}}` | Goal selected during onboarding (e.g., "track overtime pay") | Email 2 |
| `{{trial_end_date}}` | Formatted trial expiry date (e.g., "June 2, 2026") | Email 4 |
| `{{shifts_logged}}` | Total shifts logged during trial | Email 4 |
| `{{income_tracked}}` | Total income logged during trial (numeric, no $ sign) | Email 4 |
| `{{checkins_done}}` | Number of daily check-ins completed | Email 4 |

---

## Send Logic Notes

- **Email 1** fires immediately on signup, no conditions.
- **Email 2** fires on Day 3. Suppress if user has logged at least 1 shift.
- **Email 3** fires on Day 7. Suppress if user has opened the app in the last 4 days OR has logged at least 1 shift.
- **Email 4** fires on Day 27. Always send — this is the conversion email regardless of activity.
