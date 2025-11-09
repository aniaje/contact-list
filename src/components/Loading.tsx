import { Oval } from './Oval';

export function Loading() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px',
                gap: '20px',
            }}
        >
            <Oval
                height={80}
                width={80}
                color="#007bff"
                secondaryColor="#ccc"
                strokeWidth={4}
                strokeWidthSecondary={4}
            />
            <div style={{ fontSize: '18px', color: '#666' }}>
                Loading contacts...
            </div>
        </div>
    );
}
