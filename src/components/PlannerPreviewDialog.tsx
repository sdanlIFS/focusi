import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface PlannerPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fileUrl: string;
  onDownload: () => void;
}

const PlannerPreviewDialog = ({
  open,
  onOpenChange,
  title,
  fileUrl,
  onDownload,
}: PlannerPreviewDialogProps) => {
  const [loading, setLoading] = useState(true);
  const previewUrl = useMemo(
    () => `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUrl)}`,
    [fileUrl],
  );

  useEffect(() => {
    setLoading(true);
  }, [open, previewUrl]);

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setLoading(true);
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[95vh] w-[96vw] max-w-[1200px] flex-col gap-0 overflow-hidden p-0 sm:h-[92vh]">
        <DialogHeader className="shrink-0 border-b border-border bg-background px-4 py-4 sm:px-6">
          <DialogTitle className="pr-10">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Preview this planner PDF before downloading it.
          </DialogDescription>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 bg-muted/20">
          {loading && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/75">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          <iframe
            key={previewUrl}
            src={previewUrl}
            title={`${title} PDF preview`}
            className="h-full w-full border-0 bg-background"
            onLoad={() => setLoading(false)}
            allow="autoplay"
          />
        </div>

        <div className="flex shrink-0 items-center justify-end border-t border-border bg-background px-4 py-3 sm:px-6">
          <Button size="sm" onClick={onDownload}>
            <Download className="mr-1.5 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlannerPreviewDialog;

