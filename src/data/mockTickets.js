// Realistic mock ticket data for the SupportDesk dashboard.
// This stands in for a backend database and is consumed only through
// the service layer in src/services/ticketService.js.

let ticketSeq = 1000

const nextId = () => {
  ticketSeq += 1
  return `TKT-${ticketSeq}`
}

const iso = (daysAgo, hour = 9, minute = 0) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

const agent = 'Alok Prajapati'

const ticket = ({
  customer,
  subject,
  description,
  priority,
  status,
  createdDaysAgo,
  updatedDaysAgo,
  messages,
}) => {
  const id = nextId()
  return {
    id,
    customer,
    subject,
    description,
    priority,
    status,
    createdAt: iso(createdDaysAgo, 9, 15),
    updatedAt: iso(updatedDaysAgo, 14, 30),
    messages: messages.map((m, i) => ({
      id: `${id}-MSG-${i + 1}`,
      sender: m.sender,
      name: m.sender === 'customer' ? customer.name : agent,
      message: m.message,
      timestamp: iso(m.daysAgo, m.hour ?? 10, m.minute ?? 0),
    })),
  }
}

export const mockTickets = [
  ticket({
    customer: { name: 'Suman Prajapati', email: 'suman.prajapati@nimbuscorp.com', phone: '+1 (555) 010-0142' },
    subject: 'Payment failed during checkout',
    description:
      'Customer attempted to purchase the annual plan three times and each attempt fails at the final confirmation step with a generic "payment could not be processed" message. Card works fine on other sites.',
    priority: 'High',
    status: 'Open',
    createdDaysAgo: 1,
    updatedDaysAgo: 1,
    messages: [
      { sender: 'customer', daysAgo: 1, hour: 9, minute: 20, message: "I've tried three times to upgrade to annual billing and it fails right at the end every time. My card is definitely fine, I used it an hour ago at the grocery store." },
      { sender: 'support', daysAgo: 1, hour: 9, minute: 45, message: "Sorry about that, Sarah. Could you tell me which browser and whether you see any error code on screen when it fails?" },
      { sender: 'customer', daysAgo: 1, hour: 10, minute: 5, message: 'Using Chrome on a Mac. The error just says "Error 402 - payment declined by processor", no other detail.' },
    ],
  }),
  ticket({
    customer: { name: 'Marcus Chen', email: 'marcus.chen@outlook.com' },
    subject: 'Unable to reset password',
    description:
      'Reset link sent to the registered email either never arrives or expires immediately when clicked. Customer has requested four reset emails in the last day.',
    priority: 'High',
    status: 'In Progress',
    createdDaysAgo: 2,
    updatedDaysAgo: 0,
    messages: [
      { sender: 'customer', daysAgo: 2, hour: 14, minute: 0, message: "I can't get back into my account. The password reset email never shows up, I even checked spam." },
      { sender: 'support', daysAgo: 2, hour: 15, minute: 10, message: "I can see the emails were sent on our end. I've manually resent one and flagged it as priority delivery — can you check again in a few minutes?" },
      { sender: 'customer', daysAgo: 1, hour: 8, minute: 30, message: 'Still nothing. This is my third day locked out.' },
      { sender: 'support', daysAgo: 0, hour: 11, minute: 0, message: "Escalating this to our infrastructure team to check if your domain is being throttled by our mail provider. I'll update you within the hour." },
    ],
  }),
  ticket({
    customer: { name: 'Elena Vasquez', email: 'elena.vasquez@brightpath.io', phone: '+1 (555) 010-0198' },
    subject: 'Order has not arrived',
    description: 'Order #48213 was marked as delivered five days ago but the customer never received the package.',
    priority: 'Medium',
    status: 'Open',
    createdDaysAgo: 3,
    updatedDaysAgo: 3,
    messages: [
      { sender: 'customer', daysAgo: 3, hour: 10, minute: 0, message: 'Tracking says delivered but there is nothing at my door or with my building concierge. Order #48213.' },
      { sender: 'support', daysAgo: 3, hour: 13, minute: 20, message: "Thanks for flagging this, Elena. I've opened a trace with the carrier and will follow up as soon as I hear back." },
    ],
  }),
  ticket({
    customer: { name: 'David Okafor', email: 'david.okafor@zenithlabs.com' },
    subject: 'Account verification issue',
    description: 'Business account verification stuck at "pending review" for over a week despite documents being uploaded correctly.',
    priority: 'Medium',
    status: 'In Progress',
    createdDaysAgo: 7,
    updatedDaysAgo: 1,
    messages: [
      { sender: 'customer', daysAgo: 7, hour: 9, minute: 0, message: 'My business verification has been "pending" for over a week now. I uploaded the registration certificate and tax ID as requested.' },
      { sender: 'support', daysAgo: 6, hour: 16, minute: 0, message: 'Thanks for your patience — I can confirm your documents were received. The review queue is running longer than usual this week.' },
      { sender: 'support', daysAgo: 1, hour: 12, minute: 0, message: "Update: your documents have cleared initial review and are now with our compliance team for final sign-off. Should be resolved in 1-2 business days." },
    ],
  }),
  ticket({
    customer: { name: 'Amelia Rossi', email: 'amelia.rossi@studiorossi.com' },
    subject: 'Refund not received',
    description: 'Refund for a cancelled subscription was approved 10 days ago but has not appeared on the customer\'s statement.',
    priority: 'High',
    status: 'Open',
    createdDaysAgo: 4,
    updatedDaysAgo: 4,
    messages: [
      { sender: 'customer', daysAgo: 4, hour: 11, minute: 0, message: 'I was told my refund was approved on the 2nd but my bank still shows nothing. It has been over a week.' },
      { sender: 'support', daysAgo: 4, hour: 12, minute: 30, message: "I can see the refund was processed on our end on the 2nd. Refunds can take 5-10 business days to reflect depending on your bank — I'll check with our payments team to confirm it was actually sent." },
    ],
  }),
  ticket({
    customer: { name: 'James Whitfield', email: 'james.whitfield@harborline.co' },
    subject: 'Unable to update billing information',
    description: 'Customer cannot save a new credit card on file; the form silently fails without an error message.',
    priority: 'Low',
    status: 'Resolved',
    createdDaysAgo: 9,
    updatedDaysAgo: 8,
    messages: [
      { sender: 'customer', daysAgo: 9, hour: 10, minute: 0, message: "The 'save card' button on my billing page just spins forever and nothing happens." },
      { sender: 'support', daysAgo: 8, hour: 9, minute: 30, message: "Thanks for the report — this was caused by a temporary issue with our card validation service. It's fixed now, could you try again?" },
      { sender: 'customer', daysAgo: 8, hour: 10, minute: 0, message: 'Just tried it, works perfectly now. Thank you!' },
    ],
  }),
  ticket({
    customer: { name: 'Priya Sharma', email: 'priya.sharma@lumenworks.dev' },
    subject: 'Login problem',
    description: 'Customer is repeatedly logged out within a few minutes of signing in on the mobile app.',
    priority: 'Medium',
    status: 'Open',
    createdDaysAgo: 1,
    updatedDaysAgo: 1,
    messages: [
      { sender: 'customer', daysAgo: 1, hour: 18, minute: 0, message: "I log in on the app and get kicked back to the login screen within like 2 minutes, every single time." },
    ],
  }),
  ticket({
    customer: { name: 'Tom Baker', email: 'tom.baker@fieldstonemedia.com' },
    subject: 'Subscription cancellation',
    description: 'Customer wants to cancel their subscription before the next billing cycle and requests confirmation once processed.',
    priority: 'Low',
    status: 'Resolved',
    createdDaysAgo: 6,
    updatedDaysAgo: 5,
    messages: [
      { sender: 'customer', daysAgo: 6, hour: 9, minute: 0, message: "Please cancel my subscription before it renews on the 15th, I don't need it anymore." },
      { sender: 'support', daysAgo: 5, hour: 10, minute: 0, message: 'Done — your subscription is cancelled and will not renew. You still have access until the end of the current billing period.' },
    ],
  }),
  ticket({
    customer: { name: 'Natalie Kim', email: 'natalie.kim@brightpath.io' },
    subject: 'Invoice missing',
    description: 'Customer needs the October invoice for expense reporting but cannot find it in their billing history.',
    priority: 'Low',
    status: 'Open',
    createdDaysAgo: 2,
    updatedDaysAgo: 2,
    messages: [
      { sender: 'customer', daysAgo: 2, hour: 13, minute: 0, message: "I don't see my October invoice anywhere in the billing tab, I need it for expense reporting by Friday." },
    ],
  }),
  ticket({
    customer: { name: 'Carlos Mendez', email: 'carlos.mendez@outlook.com', phone: '+1 (555) 010-0177' },
    subject: 'Product damaged on delivery',
    description: 'The device arrived with a cracked casing and the customer is requesting a replacement.',
    priority: 'High',
    status: 'In Progress',
    createdDaysAgo: 3,
    updatedDaysAgo: 1,
    messages: [
      { sender: 'customer', daysAgo: 3, hour: 8, minute: 0, message: 'The unit I ordered arrived with a big crack across the front panel. Photos attached in my original email.' },
      { sender: 'support', daysAgo: 2, hour: 10, minute: 0, message: 'Thank you for the photos, Carlos — I can confirm shipping damage. A replacement unit has been dispatched with expedited shipping.' },
      { sender: 'customer', daysAgo: 1, hour: 9, minute: 0, message: 'Appreciate it, do you have a tracking number yet?' },
    ],
  }),
  ticket({
    customer: { name: 'Grace Liu', email: 'grace.liu@zenithlabs.com' },
    subject: 'Two-factor authentication not sending codes',
    description: 'SMS codes for 2FA are not arriving, blocking the customer from accessing their account entirely.',
    priority: 'High',
    status: 'Open',
    createdDaysAgo: 0,
    updatedDaysAgo: 0,
    messages: [
      { sender: 'customer', daysAgo: 0, hour: 8, minute: 0, message: 'I need to log in urgently for a client call but the 2FA text message never arrives. Tried resending 5 times.' },
    ],
  }),
  ticket({
    customer: { name: 'Ben Sutherland', email: 'ben.sutherland@harborline.co' },
    subject: 'Feature request: dark mode',
    description: 'Customer is requesting a dark mode option for the web dashboard to reduce eye strain during night shifts.',
    priority: 'Low',
    status: 'Open',
    createdDaysAgo: 12,
    updatedDaysAgo: 12,
    messages: [
      { sender: 'customer', daysAgo: 12, hour: 15, minute: 0, message: 'Any plans to add a dark theme? I work night shifts and the bright white dashboard is rough on the eyes.' },
    ],
  }),
  ticket({
    customer: { name: 'Isabel Torres', email: 'isabel.torres@studiorossi.com' },
    subject: 'Duplicate charge on card',
    description: 'Customer was charged twice for the same monthly subscription within the same billing cycle.',
    priority: 'High',
    status: 'In Progress',
    createdDaysAgo: 2,
    updatedDaysAgo: 0,
    messages: [
      { sender: 'customer', daysAgo: 2, hour: 12, minute: 0, message: 'I was charged $49 twice on the same day for the same plan. Please refund the duplicate.' },
      { sender: 'support', daysAgo: 1, hour: 9, minute: 0, message: "You're right, I can see the duplicate charge. I've submitted a refund for the extra transaction, it should land in 5-7 business days." },
      { sender: 'support', daysAgo: 0, hour: 9, minute: 0, message: "Quick update — I'm also filing a bug report so this doesn't happen to other customers on renewal day." },
    ],
  }),
  ticket({
    customer: { name: 'Owen Fitzgerald', email: 'owen.fitzgerald@fieldstonemedia.com' },
    subject: 'Exported reports show incorrect totals',
    description: 'CSV exports of monthly usage reports show totals that do not match the totals shown in the dashboard UI.',
    priority: 'Medium',
    status: 'Open',
    createdDaysAgo: 5,
    updatedDaysAgo: 5,
    messages: [
      { sender: 'customer', daysAgo: 5, hour: 11, minute: 0, message: "The dashboard shows 1,204 total requests this month but the CSV export I downloaded says 980. Which one is correct?" },
    ],
  }),
  ticket({
    customer: { name: 'Hannah Patel', email: 'hannah.patel@lumenworks.dev' },
    subject: 'Cannot invite team members',
    description: 'Team invite emails are not being received by new members, blocking onboarding for a new workspace.',
    priority: 'Medium',
    status: 'Resolved',
    createdDaysAgo: 8,
    updatedDaysAgo: 6,
    messages: [
      { sender: 'customer', daysAgo: 8, hour: 10, minute: 0, message: 'I invited three teammates two days ago and none of them received an invite email.' },
      { sender: 'support', daysAgo: 7, hour: 9, minute: 0, message: 'Apologies for the delay — this was caused by a delivery issue with a specific mail domain filter. It has been corrected and invites have been resent.' },
      { sender: 'customer', daysAgo: 6, hour: 14, minute: 0, message: 'Confirmed, all three teammates got in this morning. Thanks for the fix.' },
    ],
  }),
  ticket({
    customer: { name: 'Lucas Bergman', email: 'lucas.bergman@nimbuscorp.com' },
    subject: 'API rate limit reached unexpectedly',
    description: 'Customer is hitting the API rate limit far earlier than expected given their plan tier, blocking their integration.',
    priority: 'High',
    status: 'Open',
    createdDaysAgo: 1,
    updatedDaysAgo: 1,
    messages: [
      { sender: 'customer', daysAgo: 1, hour: 16, minute: 0, message: 'Our integration started returning 429 errors after only ~200 requests today. Our plan should allow 5,000/day.' },
      { sender: 'support', daysAgo: 1, hour: 17, minute: 0, message: "That's unexpected for your tier — I'm pulling your account's rate limit configuration now to check for a misconfiguration." },
    ],
  }),
  ticket({
    customer: { name: 'Chloe Nakamura', email: 'chloe.nakamura@brightpath.io' },
    subject: 'Mobile app crashes on startup',
    description: 'The iOS app crashes immediately on launch after the latest update, preventing any use of the product on mobile.',
    priority: 'High',
    status: 'In Progress',
    createdDaysAgo: 2,
    updatedDaysAgo: 0,
    messages: [
      { sender: 'customer', daysAgo: 2, hour: 9, minute: 0, message: "Updated the app yesterday and now it crashes instantly every time I open it, on iPhone 14." },
      { sender: 'support', daysAgo: 2, hour: 11, minute: 0, message: "Sorry for the trouble — we've had a few similar reports on iOS 17.5. Our mobile team is already investigating a fix for the next release." },
      { sender: 'support', daysAgo: 0, hour: 10, minute: 0, message: 'A patched build has been submitted for App Store review — should be live within a day or two. I will notify you as soon as it ships.' },
    ],
  }),
  ticket({
    customer: { name: 'Ryan Osei', email: 'ryan.osei@harborline.co' },
    subject: 'Request to merge duplicate accounts',
    description: 'Customer accidentally created two accounts with different emails and wants their data merged into one.',
    priority: 'Low',
    status: 'Resolved',
    createdDaysAgo: 14,
    updatedDaysAgo: 11,
    messages: [
      { sender: 'customer', daysAgo: 14, hour: 10, minute: 0, message: 'I signed up twice by mistake with two different emails, can you merge them into my main account?' },
      { sender: 'support', daysAgo: 12, hour: 9, minute: 0, message: "I've merged both accounts under your primary email. All your projects and history should now be in one place." },
      { sender: 'customer', daysAgo: 11, hour: 8, minute: 0, message: 'Perfect, everything is there. Thanks for sorting this out.' },
    ],
  }),
]
