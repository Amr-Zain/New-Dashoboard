import { useMutate } from "@/hooks/UseMutate";
import { showDynamicSwal } from "@/utils/helpers";
import { Trash } from "iconsax-reactjs";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface Props {
  item: any;
  endpoint: string;
}
const TableDeleteBtn = ({ item,endpoint }: Props) => {
  const { t } = useTranslation();

  const { mutate: Delete } = useMutate({
    mutationKey: [`${endpoint}/${item.id}`],
    endpoint: `${endpoint}/${item.id}`,
    onSuccess: async (data: any) => {
      toast.success(t("isDeletedSuccessfully", { name: t(`pages.${endpoint}`) }));
    },
    onError: async (err: any) => {
      toast.error(err?.response?.data?.message);
    },
    formData: true,
    method: "delete",
  });

  const handleDelete = async () => {
    const confirm = await showDynamicSwal({
      title: t("messages.del_item"),
      text: t("messages.del_item_desc"),
      icon: "error",
      confirmButtonText: t("buttons.ok"),
      cancelButtonText: t("buttons.noKeepMe"),
      customClass: {
        icon: "hidden-icon",
        title: "swal-title",
        confirmButton: "app-btn mx-4",
        cancelButton: "app-btn outline-btn"
      },
    });
    if (confirm.isConfirmed) {
      Delete({});
    }
  };
  return (
    <button onClick={handleDelete}>
      <Trash className="size-9 text-red-600 p-2 bg-red-100/80 rounded-full" />
    </button>
  );
};

export default TableDeleteBtn;
