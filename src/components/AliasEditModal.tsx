import { useState } from "react";

interface Props {
    open: boolean;
    defaultValue: string;
    onCancel: () => void;
    onConfirm: (alias: string) => void;
}

const AliasEditModal = ({ open, defaultValue, onCancel, onConfirm }: Props) => {
    const [value, setValue] = useState(defaultValue);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[320px]">
                <h2 className="font-semibold mb-3">별칭을 수정하시겠습니까?</h2>

                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="별칭 입력"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-slate-500"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => onConfirm(value)}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AliasEditModal;
