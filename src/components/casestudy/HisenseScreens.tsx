/**
 * The four phone screens from the Figma frame's "Final solution" row, rebuilt in HTML at
 * their exact Figma size (124.8 × 270.08) with the same text, colours and spacing.
 * The tiny UI icons are matched with Lucide icons, since the Figma icon files couldn't be
 * exported from this environment; swap in the originals (src/assets/images/hisense/) if wanted.
 */
import { CSSProperties, ReactNode } from 'react';
import { Bell, Briefcase, House, MessageSquare, User, Wallet } from 'lucide-react';

const T = {
  ink: '#171a1c', muted: '#737a80', teal: '#00a6a3', line: '#e5ebeb', soft: '#f4f7f7',
  green: '#1a9966', greenBg: '#e5f7ed', amber: '#e59926', amberBg: '#fef5e5', red: '#d94f47', redBg: '#fcf0ed',
};
const inter = (w: number, size: number, color: string = T.ink, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: 'Inter, var(--font-body)', fontWeight: w, fontSize: size, color, lineHeight: 'normal', whiteSpace: 'nowrap', margin: 0, ...extra,
});
const cairo = (w: number, size: number, color: string = T.ink, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: 'Cairo, var(--font-body)', fontWeight: w, fontSize: size, color, lineHeight: 'normal', whiteSpace: 'nowrap', margin: 0, ...extra,
});
const row = (extra: CSSProperties = {}): CSSProperties => ({ display: 'flex', alignItems: 'center', ...extra });
const col = (extra: CSSProperties = {}): CSSProperties => ({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...extra });

function Phone({ children }: { children: ReactNode }) {
  return <div className="hs-phone">{children}</div>;
}
const StatusBar = ({ rtl }: { rtl?: boolean }) => (
  <div style={row({ padding: '5.12px 7.68px 2.56px', justifyContent: rtl ? 'flex-end' : 'flex-start', flexShrink: 0 })}>
    <p style={inter(600, 4.48)}>9:41</p>
  </div>
);
const Icon = ({ as: I, size = 7.04, color = T.muted }: { as: typeof Bell; size?: number; color?: string }) => (
  <I width={size} height={size} color={color} strokeWidth={2} aria-hidden="true" />
);
const WalletBadge = ({ size, style }: { size: number; style: CSSProperties }) => (
  <span style={{ position: 'absolute', width: size, height: size, borderRadius: size * 0.28, background: 'rgba(255,255,255,0.92)', display: 'grid', placeItems: 'center', ...style }}>
    <Icon as={Wallet} size={size * 0.6} color={T.teal} />
  </span>
);
const Pill = ({ bg, color, children, ar }: { bg: string; color: string; children: ReactNode; ar?: boolean }) => (
  <span style={{ background: bg, borderRadius: 999, padding: ar ? '0.96px 3.2px' : '1.6px 3.2px', flexShrink: 0, display: 'flex' }}>
    <span style={(ar ? cairo : inter)(600, 3.52, color)} dir={ar ? 'auto' : undefined}>{children}</span>
  </span>
);
function Nav({ rtl }: { rtl?: boolean }) {
  const f = rtl ? cairo : inter;
  const items = [
    { i: House, l: rtl ? 'الرئيسية' : 'Home', on: true },
    { i: MessageSquare, l: rtl ? 'الدردشة' : 'Chat' },
    null,
    { i: Briefcase, l: rtl ? 'الأعمال' : 'Jobs' },
    { i: User, l: rtl ? 'حسابي' : 'Profile' },
  ];
  const list = rtl ? [...items].reverse() : items;
  return (
    <div style={row({ justifyContent: 'center', gap: rtl ? 10.88 : 14.08, borderTop: `0.32px solid ${T.line}`, padding: rtl ? '2.56px 0 5.12px' : '3.84px 0 6.4px', flexShrink: 0, width: '100%' })}>
      {list.map((it, k) =>
        it ? (
          <div key={k} style={col({ alignItems: 'center', gap: rtl ? 0.64 : 1.28 })}>
            <Icon as={it.i} color={it.on ? T.teal : T.muted} />
            <p style={f(it.on ? 600 : 500, 3.2, it.on ? T.teal : T.muted)} dir={rtl ? 'auto' : undefined}>{it.l}</p>
          </div>
        ) : (
          <div key={k} style={{ width: rtl ? 14.72 : 15.36, height: rtl ? 14.72 : 15.36, borderRadius: rtl ? 7.36 : 7.68, background: T.teal, display: 'grid', placeItems: 'center' }}>
            <p style={f(600, rtl ? 6.4 : 7.04, '#fff')}>+</p>
          </div>
        ),
      )}
    </div>
  );
}
const Avatar = () => <span style={{ width: 12.16, height: 12.16, borderRadius: '50%', background: T.teal, flexShrink: 0 }} />;
const BellBtn = () => (
  <span style={{ width: 12.16, height: 12.16, borderRadius: 999, background: T.soft, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
    <Icon as={Bell} color={T.ink} />
  </span>
);
const Stat = ({ n, l, bg, color, ar }: { n: string; l: string; bg: string; color: string; ar?: boolean }) => (
  <div style={col({ flex: 1, alignItems: 'center', gap: ar ? 0 : 0.64, padding: ar ? '2.56px 0' : '4.48px 0', borderRadius: 3.84, background: bg, minWidth: 0 })}>
    <p style={(ar ? cairo : inter)(700, ar ? 5.44 : 6.4, color)}>{n}</p>
    <p style={(ar ? cairo : inter)(500, ar ? 3.52 : 3.68, color)} dir={ar ? 'auto' : undefined}>{l}</p>
  </div>
);

export function HomeScreen() {
  const job = (t: string, s: string, pill: ReactNode, sc = T.muted) => (
    <div style={row({ gap: 3.84, border: `0.32px solid ${T.line}`, borderRadius: 4.48, padding: '4.48px 5.12px', width: '100%' })}>
      <div style={col({ flex: 1, gap: 0.96, minWidth: 0, overflow: 'hidden' })}>
        <p style={inter(600, 4.48)}>{t}</p>
        <p style={inter(400, 3.84, sc)}>{s}</p>
      </div>
      {pill}
    </div>
  );
  return (
    <Phone>
      <StatusBar />
      <div style={col({ flex: 1, gap: 6.4, padding: '3.84px 7.68px 5.12px', width: '100%', minHeight: 0 })}>
        <div style={row({ gap: 3.84, width: '100%' })}>
          <div style={col({ flex: 1, gap: 0.64 })}>
            <p style={inter(700, 7.04)}>Hi, Omar</p>
            <p style={inter(400, 4.16, T.muted)}>Welcome back</p>
          </div>
          <BellBtn />
          <Avatar />
        </div>
        <div style={row({ gap: 3.84, width: '100%', alignItems: 'flex-start' })}>
          <div style={col({ flex: 1, gap: 1.92, padding: 5.76, borderRadius: 5.12, background: T.teal, position: 'relative', minWidth: 0 })}>
            <p style={inter(600, 3.2, '#ccf5f2')}>MY WALLET</p>
            <p style={inter(700, 7.68, '#fff')}>42,500 IQD</p>
            <p style={inter(500, 3.84, '#d9faf7')}>+10,000 pending · View →</p>
            <WalletBadge size={10.24} style={{ left: 47.36, top: 3.2 }} />
          </div>
          <div style={col({ width: 44.8, gap: 1.92, padding: 5.76, borderRadius: 5.12, background: T.soft, flexShrink: 0 })}>
            <p style={inter(600, 3.2, T.muted)}>MY POINTS</p>
            <p style={inter(700, 7.68)}>15 pts</p>
            <p style={inter(400, 3.84, T.muted)}>1 point per job</p>
          </div>
        </div>
        <div style={row({ justifyContent: 'center', padding: '5.12px 0', borderRadius: 3.84, background: T.teal, width: '100%' })}>
          <p style={inter(600, 5.12, '#fff', { whiteSpace: 'pre' })}>{'+  Register new job'}</p>
        </div>
        <div style={row({ width: '100%', alignItems: 'flex-start' })}>
          <p style={inter(700, 5.76)}>My jobs</p>
          <span style={{ flex: 1 }} />
          <p style={inter(600, 4.16, T.teal)}>See all</p>
        </div>
        <div style={row({ gap: 3.2, width: '100%', alignItems: 'flex-start' })}>
          <Stat n="12" l="Approved" bg={T.greenBg} color={T.green} />
          <Stat n="3" l="Under review" bg={T.amberBg} color={T.amber} />
          <Stat n="1" l="Rejected" bg={T.redBg} color={T.red} />
        </div>
        {job('Hisense AC 1.5T Inverter — #1042', 'Approved · +7,500 IQD', <Pill bg={T.greenBg} color={T.green}>Approved</Pill>)}
        {job('Hisense AC 2T Split — #1043', 'Submitted today', <Pill bg={T.amberBg} color={T.amber}>Under review</Pill>)}
        {job('Hisense AC 1T Window — #1039', 'Serial unreadable — fix & resubmit', <Pill bg={T.redBg} color={T.red}>Rejected</Pill>)}
      </div>
      <Nav />
    </Phone>
  );
}

export function WalletScreen() {
  const item = (dot: string, t: string, s: string, v: string, vc: string) => (
    <div style={row({ gap: 3.84, padding: '4.48px 0', borderBottom: `0.32px solid ${T.line}`, width: '100%' })}>
      <span style={{ width: 10.88, height: 10.88, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <div style={col({ flex: 1, gap: 0.64, minWidth: 0 })}>
        <p style={inter(600, 4.32)}>{t}</p>
        <p style={inter(400, 3.68, T.muted)}>{s}</p>
      </div>
      <p style={inter(700, 4.48, vc)}>{v}</p>
    </div>
  );
  return (
    <Phone>
      <StatusBar />
      <div style={col({ flex: 1, gap: 5.76, padding: '2.56px 7.68px 7.68px', width: '100%', minHeight: 0 })}>
        <div style={row({ gap: 3.84 })}>
          <p style={inter(600, 7.04)}>‹</p>
          <p style={inter(700, 5.76)}>My Wallet</p>
        </div>
        <div style={col({ gap: 3.2, padding: '7.04px 6.4px', borderRadius: 5.76, background: T.teal, width: '100%', position: 'relative' })}>
          <p style={inter(600, 3.2, '#ccf5f2')}>CURRENT BALANCE</p>
          <p style={inter(700, 10.88, '#fff')}>42,500 IQD</p>
          <div style={row({ gap: 5.12, alignItems: 'flex-start' })}>
            <div style={col({ gap: 0.64 })}>
              <p style={inter(400, 3.52, '#d9faf7')}>Pending review</p>
              <p style={inter(600, 4.48, '#fff')}>+10,000 IQD</p>
            </div>
            <div style={col({ gap: 0.64 })}>
              <p style={inter(400, 3.52, '#d9faf7')}>Next payout</p>
              <p style={inter(600, 4.48, '#fff')}>1 Oct · ZainCash</p>
            </div>
          </div>
          <WalletBadge size={12.8} style={{ left: 92.16, top: 4.48 }} />
        </div>
        <div style={row({ padding: '3.84px 4.48px', borderRadius: 3.84, background: T.soft, width: '100%' })}>
          <p style={inter(400, 4, T.muted, { lineHeight: 1.45, whiteSpace: 'pre-wrap' })}>
            {'Payouts are sent monthly via ZainCash to your registered number +964 1782 049 294.  Change'}
          </p>
        </div>
        <p style={inter(700, 5.12)}>Activity</p>
        <div style={{ width: '100%', marginTop: -5.76 }}>
          {item('#d6efee', 'Monthly payout — ZainCash', '1 Sep 2026 · Ref #ZC-88410', '−30,000 IQD', T.ink)}
          {item(T.greenBg, 'Job #1042 approved', '28 Aug 2026', '+7,500 IQD', T.green)}
          {item(T.greenBg, 'Job #1041 approved', '26 Aug 2026', '+7,500 IQD', T.green)}
          {item(T.amberBg, 'Job #1043 under review', 'Today', '+10,000 IQD', T.amber)}
          {item('#d6efee', 'Monthly payout — ZainCash', '1 Aug 2026 · Ref #ZC-79233', '−22,500 IQD', T.ink)}
        </div>
      </div>
    </Phone>
  );
}

export function JobScreen() {
  const rows: [string, string, string?][] = [
    ['Customer', 'Ali Hassan · +964 780 xxx 221'],
    ['Product', 'Hisense AC 1T Window · AS-09HR4'],
    ['Store', 'Al-Noor Electronics, Baghdad'],
    ['Location', 'Karrada, Baghdad · map pin ✓'],
    ['Indoor serial', 'IN-4462-88231 ✓'],
    ['Outdoor serial', 'Unreadable ✕', T.red],
    ['Invoice', 'IMG_2214.jpg ✓'],
    ['Incentive on approval', '7,500 IQD'],
  ];
  return (
    <Phone>
      <StatusBar />
      <div style={col({ flex: 1, gap: 5.12, padding: '2.56px 7.68px 7.68px', width: '100%', minHeight: 0 })}>
        <div style={row({ gap: 3.84 })}>
          <p style={inter(600, 7.04)}>‹</p>
          <p style={inter(700, 5.76)}>Job #1039</p>
        </div>
        <div style={col({ gap: 2.56, padding: 5.12, borderRadius: 4.48, background: T.redBg, width: '100%' })}>
          <p style={inter(600, 3.52, T.red)}>REJECTED · 25 AUG</p>
          <p style={inter(600, 4.8, T.ink, { whiteSpace: 'normal' })}>Outdoor unit serial photo is unreadable.</p>
          <p style={inter(400, 4, T.muted, { whiteSpace: 'normal', lineHeight: 1.45 })}>
            Admin note: “The plate is blurred — please retake in better light. Everything else checks out.”
          </p>
        </div>
        <div style={col({ gap: 3.2, padding: '4.48px 5.12px', borderRadius: 4.48, background: T.soft, width: '100%' })}>
          <p style={inter(600, 4.16)}>To resubmit, replace:</p>
          <div style={row({ gap: 3.2, width: '100%' })}>
            <span style={{ width: 14.08, height: 14.08, borderRadius: 2.56, background: '#d9dede', flexShrink: 0 }} />
            <div style={col({ flex: 1, gap: 0.64, minWidth: 0 })}>
              <p style={inter(600, 4.32)}>Outdoor unit serial photo</p>
              <p style={inter(400, 3.68, T.red)}>Marked unreadable by reviewer</p>
            </div>
            <p style={inter(600, 4.16, T.teal)}>Retake</p>
          </div>
        </div>
        <p style={inter(700, 4.8)}>Submitted details</p>
        <div style={{ width: '100%' }}>
          {rows.map(([k, v, c]) => (
            <div key={k} style={row({ gap: 3.84, padding: '3.2px 0', borderBottom: `0.32px solid ${T.line}`, alignItems: 'flex-start' })}>
              <p style={inter(400, 4, T.muted, { width: 41.6, whiteSpace: 'normal' })}>{k}</p>
              <p style={inter(500, 4, c ?? T.ink, { flex: 1, whiteSpace: 'normal' })}>{v}</p>
            </div>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <div style={row({ justifyContent: 'center', padding: '4.8px 0', borderRadius: 3.84, background: T.teal, width: '100%' })}>
          <p style={inter(600, 4.8, '#fff')}>Fix &amp; resubmit</p>
        </div>
        <div style={row({ justifyContent: 'center', width: '100%' })}>
          <p style={inter(500, 4, T.teal)}>Think this is a mistake? Chat with support</p>
        </div>
      </div>
    </Phone>
  );
}

export function ArabicHomeScreen() {
  const job = (t: string, s: string, pill: ReactNode, sc = T.muted) => (
    <div style={row({ gap: 3.84, border: `0.32px solid ${T.line}`, borderRadius: 4.48, padding: '2.56px 4.48px', width: '100%' })}>
      {pill}
      <div style={col({ flex: 1, alignItems: 'flex-end', minWidth: 0, textAlign: 'right' })}>
        <p style={cairo(600, 4, T.ink, { width: '100%' })} dir="auto">{t}</p>
        <p style={cairo(400, 3.52, sc, { width: '100%' })} dir="auto">{s}</p>
      </div>
    </div>
  );
  return (
    <Phone>
      <div style={row({ padding: '5.12px 7.68px 1.28px', justifyContent: 'flex-end', flexShrink: 0 })}>
        <p style={inter(600, 4.48)}>9:41</p>
      </div>
      <div style={col({ flex: 1, gap: 5.76, padding: '2.56px 7.68px 5.12px', width: '100%', minHeight: 0 })}>
        <div style={row({ gap: 3.84, width: '100%' })}>
          <Avatar />
          <BellBtn />
          <div style={col({ flex: 1, alignItems: 'flex-end', textAlign: 'right' })}>
            <p style={cairo(700, 6.72)} dir="auto">أهلاً عمر</p>
            <p style={cairo(400, 3.84, T.muted)} dir="auto">مرحباً بعودتك</p>
          </div>
        </div>
        <div style={row({ gap: 3.84, width: '100%', alignItems: 'flex-start' })}>
          <div style={col({ width: 43.2, alignItems: 'flex-end', padding: '3.84px 5.12px', borderRadius: 5.12, background: T.soft, flexShrink: 0, textAlign: 'right' })}>
            <p style={cairo(600, 3.36, T.muted)} dir="auto">نقاطي</p>
            <p style={cairo(700, 6.08)} dir="auto">15 نقطة</p>
            <p style={cairo(400, 3.52, T.muted)} dir="auto">نقطة لكل عمل</p>
          </div>
          <div style={col({ flex: 1, alignItems: 'flex-end', padding: '3.84px 5.12px', borderRadius: 5.12, background: T.teal, position: 'relative', minWidth: 0, textAlign: 'right' })}>
            <p style={cairo(600, 3.36, '#ccf5f2')} dir="auto">محفظتي</p>
            <p style={cairo(700, 6.08, '#fff')} dir="auto">42,500 د.ع</p>
            <p style={cairo(500, 3.68, '#d9faf7')} dir="auto">‏+10,000 قيد المراجعة · عرض</p>
            <WalletBadge size={10.24} style={{ left: 3.2, top: 3.2 }} />
          </div>
        </div>
        <div style={row({ justifyContent: 'center', padding: '3.52px 0', borderRadius: 3.84, background: T.teal, width: '100%' })}>
          <p style={cairo(600, 4.8, '#fff')} dir="auto">+ تسجيل عمل جديد</p>
        </div>
        <div style={row({ width: '100%' })}>
          <p style={cairo(600, 4, T.teal)} dir="auto">عرض الكل</p>
          <span style={{ flex: 1 }} />
          <p style={cairo(700, 5.44)} dir="auto">أعمالي</p>
        </div>
        <div style={row({ gap: 3.2, width: '100%', alignItems: 'flex-start' })}>
          <Stat n="1" l="مرفوض" bg={T.redBg} color={T.red} ar />
          <Stat n="3" l="قيد المراجعة" bg={T.amberBg} color={T.amber} ar />
          <Stat n="12" l="مقبول" bg={T.greenBg} color={T.green} ar />
        </div>
        {job('مكيف هايسنس 1.5 طن انفرتر — ‎#1042', 'مقبول · ‏+7,500 د.ع', <Pill bg={T.greenBg} color={T.green} ar>مقبول</Pill>)}
        {job('مكيف هايسنس 2 طن سبليت — ‎#1043', 'تم الإرسال اليوم', <Pill bg={T.amberBg} color={T.amber} ar>قيد المراجعة</Pill>)}
        {job('مكيف هايسنس 1 طن شباك — ‎#1039', 'الرقم التسلسلي غير واضح — صحّح وأعد الإرسال', <Pill bg={T.redBg} color={T.red} ar>مرفوض</Pill>, T.red)}
      </div>
      <Nav rtl />
    </Phone>
  );
}
